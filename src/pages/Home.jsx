import React from 'react';
import ControlPanel from '../components/controlPanel/ControlPanel';
import Homepage from '../components/home/Homepage';
import Modal from '../components/Modal/Modal';
import { useModal } from '../contexts/ModalContext';
import AddAgentModal from '../components/Modal/AddAgentModal';

const Home = () => {
  const { isAgentModalOpen } = useModal();
  return (
    <div>
      <ControlPanel />
      <Homepage />
      {isAgentModalOpen && (
        <Modal>
          <AddAgentModal />
        </Modal>
      )}
    </div>
  );
};

export default Home;
