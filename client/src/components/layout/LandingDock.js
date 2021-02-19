import Dock from "react-osx-dock";
import facebookIcon from '../../img/icons/045-facebook.png'
import instagramIcon from '../../img/icons/034-instagram.png'
import linkedinIcon from '../../img/icons/031-linkedin.png'
import youtubeIcon from '../../img/icons/002-youtube.png'
import twitterIcon from '../../img/icons/014-twitter.png'
import stackoverflowIcon from '../../img/icons/stack-overflow.png'
import reactIcon from '../../img/icons/react.png'
import nodejsIcon from '../../img/icons/nodejs.png'
import herokuIcon from '../../img/icons/heroku.png'
import mongodbIcon from '../../img/icons/mongodb.png'
import githubIcon from '../../img/icons/github.png'

export default function LandingDock() {
    const icons = [
        {
            name: "FaceBook",
            image: facebookIcon,
            to: "https://www.facebook.com/"
        },
        {
            name: "Instagram",
            image: instagramIcon,
            to: "https://www.instagram.com/"
        },
        {
            name: "LinkedIn",
            image: linkedinIcon,
            to: "https://in.linkedin.com/"
        },
        {
            name: "Youtube",
            image: youtubeIcon,
            to: "https://www.youtube.com/"
        },
        {
            name: "Twitter",
            image: twitterIcon,
            to: "https://twitter.com/"
        },
        {
            name: "Github",
            image: githubIcon,
            to: "https://github.com/dev-shashank/DevTech"
        },
        {
            name: "MongoDB",
            image: mongodbIcon,
            to: "https://www.mongodb.com/3"
        },
        {
            name: "NodeJS",
            image: nodejsIcon,
            to: "https://nodejs.org/"
        },
        {
            name: "React",
            image: reactIcon,
            to: "https://reactjs.org/"
        },
        {
            name: "Heroku",
            image: herokuIcon,
            to: "https://www.heroku.com/"
        },
        {
            name: "Stackoverflow",
            image: stackoverflowIcon,
            to: "https://stackoverflow.com/"
        }
    ];
    return (
        <div className="dock">
            <Dock backgroundClassName="dock-background" width={900} magnification={2} magnifyDirection="up">
                {icons.map((item, index) => (
                    <Dock.Item key={index} onClick={() => console.log(item)}>
                        <a target="_blank" rel="noreferrer" href={item.to}>
                            <img src={`${item.image}`} width='100%' height='100%' alt={item.name} aria-label={item.name} style={{ width: '40%' }} />
                        </a>
                    </Dock.Item>
                ))}
            </Dock>
        </div>
    )
}
