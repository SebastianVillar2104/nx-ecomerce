BEGIN;

CREATE TABLE customer (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
    stock INTEGER NOT NULL CHECK (stock >= 0),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL,

    status VARCHAR(30) NOT NULL
        CHECK (status IN (
            'PENDING',
            'CONFIRMED',
            'CANCELLED',
            'COMPLETED'
        )),

    total NUMERIC(12, 2) NOT NULL CHECK (total >= 0),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_cart_customer
        FOREIGN KEY (customer_id)
        REFERENCES customer(id)
);

CREATE TABLE cart_item (
    cart_id UUID NOT NULL,
    product_id UUID NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0),

    PRIMARY KEY (cart_id, product_id),

    CONSTRAINT fk_cart_item_cart
        FOREIGN KEY (cart_id)
        REFERENCES cart(id),

    CONSTRAINT fk_cart_item_product
        FOREIGN KEY (product_id)
        REFERENCES product(id)
);

CREATE TABLE payment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID NOT NULL UNIQUE,

    status VARCHAR(30) NOT NULL
        CHECK (status IN (
            'PENDING',
            'AUTHORIZED',
            'PAID',
            'FAILED',
            'CANCELLED',
            'REFUNDED'
        )),

    amount NUMERIC(12, 2) NOT NULL,
    external_payment_id VARCHAR(255) UNIQUE,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_payment_cart
        FOREIGN KEY (cart_id)
        REFERENCES cart(id)
);

COMMIT;