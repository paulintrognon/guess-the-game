import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import BarTitle from '../../../components/BarTitle/BarTitle';
import PagesSwitcher from '../../../components/PagesSwitcher/PagesSwitcher';
import ScreenshotsGrid from '../../../components/ScreenshotsGrid/ScreenshotsGrid';
import addedScreenshotsActions from '../../../store/addedScreenshots/addedScreenshotsActions';
import './AddedScreenshots.css';

function mapStoreToProps(store) {
  return {
    addedScreenshots: store.addedScreenshots.screenshots,
    isLoading: store.addedScreenshots.isLoading,
    hasMore: store.addedScreenshots.hasMore,
  };
}
class AddedScreenshotsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
    if (props.location.pathname.indexOf('/valides') > -1) {
      this.approvalStatus = 'approved';
    } else if (props.location.pathname.indexOf('/en-attente') > -1) {
      this.approvalStatus = 'waiting';
    } else if (props.location.pathname.indexOf('/refuses') > -1) {
      this.approvalStatus = 'refused';
    }

    this.handleLoadMore(true);
  }

  handleLoadMore = reset => {
    if (reset) {
      this.props.dispatch(addedScreenshotsActions.resetUserAddedScreenshots());
    }
    const { addedScreenshots } = this.props;
    const { searchText } = this.state;
    this.props.dispatch(
      addedScreenshotsActions.loadUserAddedScreenshots({
        approvalStatus: this.approvalStatus,
        searchText,
        limit: 12,
        offset: reset ? 0 : (addedScreenshots && addedScreenshots.length) || 0,
      })
    );
  };

  handleSearch = searchText => {
    this.setState({ searchText });
    this.props.dispatch(
      addedScreenshotsActions.loadUserAddedScreenshots({
        approvalStatus: this.approvalStatus,
        searchText,
        limit: 12,
        offset: 0,
      })
    );
  };

  render() {
    const { addedScreenshots, hasMore, isLoading } = this.props;
    return (
      <section className="section">
        <Helmet title="Screenshots Approuvés" />
        <div className="AddedScreenshotsPage">
          <BarTitle onlyOnSmartphones>
            <h2>Screenshots Ajoutes</h2>
          </BarTitle>

          <PagesSwitcher
            links={[
              { label: 'Tous', to: '/moi/ajoutes' },
              { label: 'Approuvés', to: '/moi/ajoutes/valides' },
              { label: 'En Attente', to: '/moi/ajoutes/en-attente' },
              { label: 'Refusés', to: '/moi/ajoutes/refuses' },
            ]}
          />

          <ScreenshotsGrid
            screenshots={addedScreenshots}
            canEditScreenshots
            hasMore={hasMore}
            isLoading={isLoading}
            handleLoadMore={this.handleLoadMore}
            handleSearch={this.handleSearch}
          >
            <Link className="ScreenshotsGrid_item" to="/ajouter-un-screenshot">
              <div className="AddedScreenshotsPage_item_add">
                <svg
                  className="AddedScreenshotsPage_item_add_icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
                </svg>
              </div>
              <div className="AddedScreenshotsPage_item_legend">
                <p>Ajouter un nouveau</p>
              </div>
            </Link>
          </ScreenshotsGrid>
        </div>
      </section>
    );
  }
}
export default connect(mapStoreToProps)(AddedScreenshotsPage);
