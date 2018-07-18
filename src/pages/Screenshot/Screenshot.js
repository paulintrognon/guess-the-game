import React from 'react';
import { connect } from 'react-redux';
import screenshotActions from '../../actions/screenshotActions';
import './screenshot.css';

function mapStoreToProps(store) {
  return {
    screenshot: store.screenshot,
  };
}
class ScreenshotPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      proposal: '',
      isProposalRight: false,
      isProposalWrong: false,
    };

    if (!props.screenshot.id && props.match.params.id) {
      this.props.dispatch(
        screenshotActions.loadScreenshot(props.match.params.id)
      );
    }
  }

  changeProposalHandler = event => {
    this.setState({
      proposal: event.target.value,
    });
  };

  trySubmitHandler = event => {
    event.preventDefault();
    if (this.state.isProposalRight || !this.state.proposal.trim()) {
      return;
    }
    console.log(this.state.proposal);
  };

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="ScreenshotPage">{this.renderScreenshot()}</div>
        </div>
      </section>
    );
  }

  renderScreenshot() {
    const { screenshot } = this.props;
    if (screenshot.isLoading) {
      return <p>Loading</p>;
    }
    return (
      <div>
        <h2 className="ScreenshotPage__title title is-5">
          Screenshot #{screenshot.id}
        </h2>
        <div className="ScreenshotPage__screenshot">
          <p>
            <img
              className="ScreenshotPage__screenshot__image"
              src={screenshot.url}
              alt={`Guess The Game Screenshot #${screenshot.id}`}
            />
          </p>
          {this.renderFooter()}
        </div>
      </div>
    );
  }

  renderFooter() {
    const { screenshot } = this.props;
    if (screenshot.isSolved) {
      return <p>You have solved this screenshot the {this.solveDate}</p>;
    }
    return (
      <form className="ScreenshotPage__form" onSubmit={this.trySubmitHandler}>
        <div className="columns is-tablet">
          <div className="column" />
          <div className="column is-two-thirds">
            <div className="field has-addons">
              <div className="control is-expanded">
                <input
                  className={`input 
                  ${this.state.isProposalRight ? 'is-success' : ''}
                  ${this.state.isProposalWrong ? 'is-danger' : ''}
                `}
                  type="text"
                  placeholder="What is that game?"
                  value={this.state.proposal}
                  onChange={this.changeProposalHandler}
                />
              </div>
              <div className="control">
                {this.state.isProposalRight ? (
                  <button type="button" className="button is-success">
                    <span className="icon is-small is-right">
                      <i className="fas fa-check fa-xs is-success" />
                    </span>
                  </button>
                ) : (
                  <button type="submit" className="button is-info">
                    Guess
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="column ScreenshotPage__form__next__container">
            <button
              type="button"
              className="ScreenshotPage__form__next button is-light"
            >
              Try another
            </button>
          </div>
        </div>
      </form>
    );
  }
}
export default connect(mapStoreToProps)(ScreenshotPage);
