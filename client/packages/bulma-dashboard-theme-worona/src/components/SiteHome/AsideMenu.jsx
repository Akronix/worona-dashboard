import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { defaultSettings } from '../../selectors/initialState';

const MenuEntry = ({ name, target }) => (
  <li>
    <Link to={target} role="button" activeClassName="is-active">{name}</Link>
  </li>
);

MenuEntry.propTypes = {
  name: React.PropTypes.string,
  target: React.PropTypes.string,
};

const MenuCategory = ({ name, entries }) => (
  <div name={name}>
    <p className="menu-label">
      {name}
    </p>
    <ul className="menu-list">
      {entries.map((entry, index) =>
        (<MenuEntry key={index} tabindex={index + 4} {...entry} />)
      )}
    </ul>
  </div>
);

MenuCategory.propTypes = {
  name: React.PropTypes.string,
  entries: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

const AsideMenu = ({ settingCategories, settingMenuEntries }) => (
    <div className="column is-hidden-mobile is-2-desktop">
        <aside className="menu">
          {
            settingCategories.map((categoryName, index) =>
            (<MenuCategory key={index} name={categoryName}
              entries={settingMenuEntries.filter(entry => entry.categoryName === categoryName)}
            />)
            )
          }
        </aside>
    </div>
);

AsideMenu.propTypes = {
  settingCategories: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  settingMenuEntries: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

const mapStateToProps = () => ({
  settingCategories: defaultSettings.settingCategories,
  settingMenuEntries: defaultSettings.settingMenuEntries,
});

export default connect(mapStateToProps)(AsideMenu);
