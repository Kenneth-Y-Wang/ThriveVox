import React from 'react';

export default class SingleUserResult extends React.Component {
  render() {
    return (
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
        <div className="detail-modal-holder hidden">
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
    );
  }
}
