import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getGithubRepos } from '../../actions/profile';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const ProfileGithub = ({ getGithubRepos, username, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos]);

  return (
    <div className='card'>
      <h2 className='blue-text text-darken-4'>Github Repos</h2>
      <div className="card-action">
      {repos === null ? (
        <Spinner />
      ) : (
            repos.map(repo=>(
        <div key={repo.id} className='row card-action'>
             <div className='col s9'>
             <h4 >
                    <a href={repo.html_url} className='black-text' target='_blank' rel='noopener noreferrer'>{repo.name}</a>
              </h4>
              <p>{repo.description}</p>
             </div>

             <div className='right-align col s3'>
                   <ul className='collection'>
                         <li className="collection-item">
                               Stars : {repo.stargazers_count}
                         </li>
                         <li className="collection-item">
                               Watchers : {repo.watchers_count}
                         </li>
                         <li className="collection-item">
                               Forks : { repo.forks_count}
                         </li>
                   </ul>
             </div>
        </div>
        
     
            ))
      )}
      </div>
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
