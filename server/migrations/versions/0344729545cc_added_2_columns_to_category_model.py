"""added 2 columns to category model

Revision ID: 0344729545cc
Revises: 6883b023e680
Create Date: 2023-08-13 11:28:12.402003

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0344729545cc'
down_revision = '6883b023e680'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('categories', sa.Column('href', sa.String(), nullable=True))
    op.add_column('categories', sa.Column('image_url', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('categories', 'image_url')
    op.drop_column('categories', 'href')
    # ### end Alembic commands ###