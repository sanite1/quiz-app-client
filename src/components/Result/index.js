import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Menu } from 'semantic-ui-react';

import Stats from './Stats';
import QNA from './QNA';
import Layout from '../Layout';
import NewUser from './NewUser';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('Create Question');

  const handleTabClick = (e, { name }) => {
    setActiveTab(name);
  };

  return (
    <Layout>
      <Container>
        <Menu fluid widths={3}>
          <Menu.Item
            name="Create Question"
            active={activeTab === 'Create Question'}
            onClick={handleTabClick}
          />
          <Menu.Item
            name="Create User"
            active={activeTab === 'Create User'}
            onClick={handleTabClick}
          />
          <Menu.Item
            name="View Results"
            active={activeTab === 'View Results'}
            onClick={handleTabClick}
          />
        </Menu>
        {activeTab === 'Create Question' && ( <Stats /> )}
        {activeTab === 'Create User' && ( <NewUser /> )}
        {activeTab === 'View Results' && <QNA  />}
        <br />
      </Container>
    </Layout>
  );
};

Admin.propTypes = {
  totalQuestions: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
  timeTaken: PropTypes.number.isRequired,
  questionsAndAnswers: PropTypes.array.isRequired,
  replayQuiz: PropTypes.func.isRequired,
  resetQuiz: PropTypes.func.isRequired
};

export default Admin;
