// import React from 'react';

// export default function Home(props) {
//   return (
//     <>
//     </>
//   );
// }

import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

const sections = [
  {
    title: 'My Picks',
    content: "When billionaire industrialist Tony Stark dons his sophisticated steel-mesh armor, he becomes a living high-tech weapon - the world's greatest fighting machine.Tony has primed his ultra modern creation for waging state of the art campaigns, attaining sonic flight, and defending the greater good! He is the Armored Avenger - driven by a heart that is part machine, but all hero! He is the INVINCIBLE IRON MAN!"
  },

  {
    title: 'About Me',
    content: "During WWII, the patriotic Steve Rogers was offered a place in the military's top operation: Rebirth. Injected with an experimental super-serum, Rogers emerged from the treatment with heightened endurance, strength, and reaction time. With extensive training and an indestructible Vibranium shield, Rogers soon became the country's ultimate weapon: CAPTAIN AMERICA! "
  },

  {
    title: 'My Favorite',
    content: "A massive dose of gamma radiation transformed the brilliant but meek scientist Bruce Banner's DNA, awakening the hidden, adrenaline-fed hero in his genes... HULK! A hero of few words and incredible strength, the Hulk has long been pursued by those who want to use his immense power for their own purposes, or by those who thought the Jade Giant's anger was too dangerous to be controlled."
  }
];

export default class Home extends React.Component {
  render() {

    if (!this.context.user) return <Redirect to="sign-in" />;

    return (
      <div className="home-page">
        <div className="personal-info">
          <div className="col-half user-profile-pic"></div>
          <div className="col-half user-profile-pic"></div>
        </div>
        {/* <CustomAccordion sections={sections} /> */}
      </div>
    );
  }
}

Home.contextType = AppContext;
