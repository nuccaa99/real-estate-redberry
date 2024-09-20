import React from 'react';
import Filter from './filter/Filter';
import { useNavigate } from 'react-router-dom';
import routes from '../../constants/routes';
import plusBright from '../../assets/plus-bright.svg';
import plusLight from '../../assets/plus-light.svg';
import SelectedFilters from './filter/SelectedFilters';
import { useModal } from '../../contexts/ModalContext';

const ControlPanel = () => {
  const navigate = useNavigate();
  const { setIsAgentModalOpen } = useModal();
  return (
    <div className="filter_section_container">
      <div className="control_panel_container">
        <Filter />
        <div className="controlpanel_btns_container">
          <button
            className="controlpanel_btn add_listing"
            onClick={() => navigate(routes.addListing)}
          >
            <img src={plusLight} alt="plus" />
            <span>ლისტინგის დამატება</span>
          </button>
          <button
            className="controlpanel_btn add_agent"
            onClick={() => setIsAgentModalOpen(true)}
          >
            <img src={plusBright} alt="plus" />
            <span>აგენტის დამატება</span>
          </button>
        </div>
      </div>
      <SelectedFilters />
    </div>
  );
};

export default ControlPanel;
