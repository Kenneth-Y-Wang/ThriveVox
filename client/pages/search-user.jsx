import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

export default class SearchUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOk: true };
  }

  render() {
    if (!this.context.user) return <Redirect to="sign-in" />;
    return (
    <>
      <form>
        <div className="col-nine-tenth user-search-holder">
         <div className=" col-three-fifth location-search-bar">
          <label htmlFor="location">Location:</label>
              <input className="favorite-search-input" id="location" name='location' type="text"></input>
         </div>
        </div>
        <div className="col-full option-search-holder">
          <div className="col-two-fifth option-col">
            <div className="button-pic-holder chosen"><img src="/images/cover_image-1627388726.jpg" /></div>
            <h1>Musian</h1>
          </div>
          <div className="col-two-fifth option-col">
            <div className="button-pic-holder"><img src="/images/photo-1501612780327-45045538702b.jpeg" /></div>
            <h1>Band</h1>
          </div>
        </div>
      </form>
        <div className="section-header">Search Result</div>
        <div className="search-result-holder">
          <div className=" col-nine-tenth single-user-search-holder">
            <div className="col-two-fifth search-profile-pic-col">
              <div className="profile-pic-holder"><img src="/images/image-1635997999983.jpeg" /></div>
            </div>
            <div className="col-three-fifth search-user-info-col">
              <div className="name-detail-row">
                <h3 >Name:<span> Jimin Lee</span></h3>
                <button className=" user-detail-button" type='button'>Detail</button>
              </div>
              <h3 className="user-info-text">Location:<span> Irvine</span></h3>
              <h3 className="user-info-text">Primary Interest:<span> Join Existing Band</span></h3>
              <h3 className="user-info-text">Styles:<span> Classical, Country, Pop, R&B</span></h3>
              <h3 className="user-info-text">Skills:<span> Guitar(Electric), Bass(Electric), Vocal(Advanced)</span></h3>
              <h3 className="user-info-text">Email:<span> Jiminlee123@gmail.com</span></h3>
            </div>
            <div className="detail-modal-holder">
              <div className="col-three-fifth detail-block">
                <h3>About Me</h3>
                <div className="about-me-holder">
                  Jimin has been playing her music mainly with her group Jimin Lee Quartet featuring Eunyoung Kim on piano, Seungho Jang on bass, and Junyoung Song on drums. She’s also singing standard jazz repertoire with some of the finest jazz musicians in Seoul and making a wide spectrum of music for albums and concerts
                </div>
                <h4>Contact Me:</h4>
                <a>Jiminlee123@gmail.com</a>
                <button className="user-detail-button">Back</button>
              </div>
            </div>
          </div>
        </div>
    </>
    );
  }
}

SearchUsers.contextType = AppContext;
