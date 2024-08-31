import 'bulma/css/bulma.css';
import ProfileCard from "./ProfileCard";
import alexaImg from './images/alexa.png';
import siriImg from './images/siri.png';
import cortanaImg from './images/cortana.png';

function App() {

    return <div>
        <section class="hero is-primary">
            <div class="hero-body">
                <p class="title">Personal Digital Assistant</p>
            </div>
        </section>

        <div className='container' >
            <section className='section'>
                <div className='columns'>
                    <div className='column is-4' >
                        <ProfileCard title="alexa" handle="alexa@99" image={alexaImg} description="tregjieg gergvergv gergverbvmkb egrreg gfsg efsg" />
                    </div>
                    <div className='column is-4' >
                        <ProfileCard title="cortana" handle="alexa@99" image={siriImg} description="fsdgs dsfg fsgf fsfg  fsdg  gsgs gf s" />
                    </div>
                    <div className='column is-4' >
                        <ProfileCard title="siri" handle="alexa@99" image={cortanaImg} description="fsdg fgsg  fse g fgse gs gsr g fgsg s gs " />
                    </div>
                </div>

            </section>



        </div>
    </div>

}

export default App;