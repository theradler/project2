
from flask_wtf import Form
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired


class localUserName(Form):
    username = StringField('username', validators=[DataRequired()])
    submit = SubmitField('submit')