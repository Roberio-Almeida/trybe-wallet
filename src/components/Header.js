import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  totalExpenses = () => {
    const { expenses } = this.props;
    return expenses.reduce((acc, elem) => (
      acc + (elem.value * elem.exchangeRates[elem.currency].ask)
    ), 0);
  }

  render() {
    const { email } = this.props;
    return (
      <header className="header">
        <a href="/">
          <img
            className="wallet-logo"
            src="/trybe-wallet/wallet-logo.png"
            alt="wallet logo trybe wallet"
          />
        </a>
        <section className="wallet-info">
          <span data-testid="email-field" className="email-field">
            Email:
            {' '}
            {email}
          </span>
          {' '}
          <span data-testid="total-field" className="total-field">
            Total Expense: R$
            {this.totalExpenses().toFixed(2)}
          </span>
          {' '}
          <span data-testid="header-currency-field">BRL</span>
        </section>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Header);
