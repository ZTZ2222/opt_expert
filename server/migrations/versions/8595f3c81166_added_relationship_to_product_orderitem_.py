"""added relationship to product, orderitem and category to some models

Revision ID: 8595f3c81166
Revises: 3bb72360d82b
Create Date: 2023-09-08 11:16:42.301003

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8595f3c81166'
down_revision = '3bb72360d82b'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('order_items_order_id_fkey', 'order_items', type_='foreignkey')
    op.drop_constraint('order_items_product_id_fkey', 'order_items', type_='foreignkey')
    op.create_foreign_key(None, 'order_items', 'products', ['product_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'order_items', 'orders', ['order_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'order_items', type_='foreignkey')
    op.drop_constraint(None, 'order_items', type_='foreignkey')
    op.create_foreign_key('order_items_product_id_fkey', 'order_items', 'products', ['product_id'], ['id'])
    op.create_foreign_key('order_items_order_id_fkey', 'order_items', 'orders', ['order_id'], ['id'])
    # ### end Alembic commands ###
