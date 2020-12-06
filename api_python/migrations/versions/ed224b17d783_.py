"""empty message

Revision ID: ed224b17d783
Revises: 
Create Date: 2020-10-30 15:14:56.145434

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'ed224b17d783'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('pedidoprodutos', sa.Column('quantidadeProduto', sa.Integer(), nullable=False))
    op.drop_column('pedidoprodutos', 'quantidade')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('pedidoprodutos', sa.Column('quantidade', mysql.INTEGER(), autoincrement=False, nullable=False))
    op.drop_column('pedidoprodutos', 'quantidadeProduto')
    # ### end Alembic commands ###
