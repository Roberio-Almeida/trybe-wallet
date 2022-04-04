import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expenseThunk } from '../actions';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Cash',
      tag: 'Food',
    };
  }

  onHandleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  onHandleClick = (e) => {
    e.preventDefault();
    const { setExpenseState } = this.props;
    setExpenseState(this.state);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Cash',
      tag: 'Food',
    });
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const categories = ['Food', 'Leisure', 'Work', 'Transport', 'Health'];
    const paymentForm = ['Cash', 'Credit card', 'Debit card'];
    return (
      <section className="expense-form">
        <form>
          <label htmlFor="expense">
            Value:
            <input
              className="btn btn-outline-secondary w-75 p-1 padd"
              type="number"
              name="value"
              value={ value }
              id="expense"
              onChange={ this.onHandleChange }
              data-testid="value-input"
            />
          </label>

          <label htmlFor="description">
            Description:
            <input
              className="btn btn-outline-secondary padd"
              type="text"
              name="description"
              value={ description }
              id="description"
              onChange={ this.onHandleChange }
              data-testid="description-input"
            />
          </label>

          <label htmlFor="currency">
            Currency:
            <select
              className="btn btn-outline-secondary dropdown-toggle padd"
              name="currency"
              value={ currency }
              id="currency"
              onChange={ this.onHandleChange }
            >
              { currencies.map((curr) => (
                <option
                  key={ curr }
                  value={ curr }
                >
                  { curr }
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="method">
            Payment Method:
            <select
              className="btn btn-outline-secondary dropdown-toggle padd"
              id="method"
              name="method"
              value={ method }
              onChange={ this.onHandleChange }
              data-testid="method-input"
            >
              {paymentForm.map((item) => (
                <option key={ item }>{ item }</option>
              ))}
            </select>
          </label>

          <label htmlFor="tag">
            Tag:
            <select
              className="btn btn-outline-secondary dropdown-toggle padd"
              id="tag"
              name="tag"
              value={ tag }
              onChange={ this.onHandleChange }
              data-testid="tag-input"
            >
              {categories.map((item) => (
                <option key={ item }>{ item }</option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            onClick={ this.onHandleClick }
            className="btn btn-secondary padd"
          >
            Add Expense
          </button>
        </form>
      </section>
    );
  }
}

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object),
  expenses: PropTypes.arrayOf(PropTypes.object),
  setExpenseState: PropTypes.func,
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  setExpenseState: (state) => dispatch(expenseThunk(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
