BEGIN;

INSERT INTO customer (id, name, email, password, active) VALUES ('11111111-1111-1111-1111-111111111111', 'Juan Pérez', 'juan.perez@example.com', 'hashed_password_1', true) ON CONFLICT DO NOTHING;
INSERT INTO customer (id, name, email, password, active) VALUES ('22222222-2222-2222-2222-222222222222', 'María García', 'maria.garcia@example.com', 'hashed_password_2', true) ON CONFLICT DO NOTHING;

INSERT INTO product (id, name, price, stock) VALUES ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Notebook', 1200.00, 10) ON CONFLICT DO NOTHING;
INSERT INTO product (id, name, price, stock) VALUES ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Monitor', 450.00, 20) ON CONFLICT DO NOTHING;
INSERT INTO product (id, name, price, stock) VALUES ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Teclado', 80.00, 30) ON CONFLICT DO NOTHING;

INSERT INTO cart (id, customer_id, status, total) VALUES ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'CONFIRMED', 2850.00) ON CONFLICT DO NOTHING;
INSERT INTO cart (id, customer_id, status, total) VALUES ('44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'PENDING', 80.00) ON CONFLICT DO NOTHING;

INSERT INTO cart_item (cart_id, product_id, quantity, unit_price) VALUES ('33333333-3333-3333-3333-333333333333', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 2, 1200.00) ON CONFLICT DO NOTHING;
INSERT INTO cart_item (cart_id, product_id, quantity, unit_price) VALUES ('33333333-3333-3333-3333-333333333333', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 1, 450.00) ON CONFLICT DO NOTHING;
INSERT INTO cart_item (cart_id, product_id, quantity, unit_price) VALUES ('44444444-4444-4444-4444-444444444444', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 1, 80.00) ON CONFLICT DO NOTHING;

INSERT INTO payment (id, cart_id, status, amount, external_payment_id) VALUES ('55555555-5555-5555-5555-555555555555', '33333333-3333-3333-3333-333333333333', 'PAID', 2850.00, 'ext-payment-001') ON CONFLICT DO NOTHING;
INSERT INTO payment (id, cart_id, status, amount, external_payment_id) VALUES ('66666666-6666-6666-6666-666666666666', '44444444-4444-4444-4444-444444444444', 'PENDING', 80.00, 'ext-payment-002') ON CONFLICT DO NOTHING;

COMMIT;