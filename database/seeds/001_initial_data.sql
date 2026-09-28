BEGIN;

INSERT INTO account (id, name, email, password, active, role) VALUES ('11111111-1111-1111-1111-111111111111', 'Juan Pérez', 'juan.perez@example.com', '$2b$10$vQxvc0QhYpt2OXH5SqzJJ.ABtLy7Tz4ic9BS70BAKaNb/y2G4fdxm', true, 'CUSTOMER');
INSERT INTO account (id, name, email, password, active, role) VALUES ('22222222-2222-2222-2222-222222222222', 'María García', 'maria.garcia@example.com', '$2b$10$vQxvc0QhYpt2OXH5SqzJJ.ABtLy7Tz4ic9BS70BAKaNb/y2G4fdxm', true, 'CUSTOMER');
INSERT INTO account (id, name, email, password, active, role) VALUES ('33333333-3333-3333-3333-333333333333', 'Admin', 'admin@example.com', '$2b$10$vQxvc0QhYpt2OXH5SqzJJ.ABtLy7Tz4ic9BS70BAKaNb/y2G4fdxm', true, 'ADMIN');

INSERT INTO product (id, name, price, stock) VALUES ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Notebook', 1200.00, 10);
INSERT INTO product (id, name, price, stock) VALUES ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Monitor', 450.00, 20);
INSERT INTO product (id, name, price, stock) VALUES ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Teclado', 80.00, 30);

INSERT INTO cart (id, account_id, status, total) VALUES ('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'CONFIRMED', 2850.00);
INSERT INTO cart (id, account_id, status, total) VALUES ('55555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222', 'PENDING', 80.00);

INSERT INTO cart_item (cart_id, product_id, quantity, unit_price) VALUES ('44444444-4444-4444-4444-444444444444', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 2, 1200.00);
INSERT INTO cart_item (cart_id, product_id, quantity, unit_price) VALUES ('44444444-4444-4444-4444-444444444444', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 1, 450.00);
INSERT INTO cart_item (cart_id, product_id, quantity, unit_price) VALUES ('55555555-5555-5555-5555-555555555555', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 1, 80.00);

INSERT INTO payment (id, cart_id, status, amount, external_payment_id) VALUES ('66666666-6666-6666-6666-666666666666', '44444444-4444-4444-4444-444444444444', 'PAID', 2850.00, 'ext-payment-001');
INSERT INTO payment (id, cart_id, status, amount, external_payment_id) VALUES ('77777777-7777-7777-7777-777777777777', '55555555-5555-5555-5555-555555555555', 'PENDING', 80.00, 'ext-payment-002');

COMMIT;