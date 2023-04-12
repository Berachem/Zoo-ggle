import { Button, IconButton } from "@material-tailwind/react"
import TeamCard from "../card/teamCard"
import PageTitle from "../titles/pageTitle"
// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFaceAngry } from "@fortawesome/free-solid-svg-icons"

export default function Team(){
    const teamData = [
        {
            img : "https://berachem.dev/assets/img/moi_bg_navy.png",
            name : "Berachem",
            position : "Développeur",
            socials : [
                {
                    name : "Linkedin",
                    color : "blue",
                    link : "https://www.linkedin.com/in/berachem/",
                },
                {
                    name : "Github",
                    color : "black",
                    link : "https://github.com/berachem",
                }
            ]
        },
        {
            img : "https://berachem.dev/assets/img/moi_bg_navy.png",
            name : "Berachem",
            position : "Développeur",
            socials : [
                {
                    name : "Linkedin",
                    color : "blue",
                    link : "https://www.linkedin.com/in/berachem/",
                },
                {
                    name : "Github",
                    color : "black",
                    link : "https://github.com/berachem",
                }
            ]
        },
        {
            img : "https://berachem.dev/assets/img/moi_bg_navy.png",
            name : "Berachem",
            position : "Développeur",
            socials : [
                {
                    name : "Linkedin",
                    color : "blue",
                    link : "https://www.linkedin.com/in/berachem/",
                },
                {
                    name : "Github",
                    color : "black",
                    link : "https://github.com/berachem",
                }
            ]
        }
    ]
    return(
        <section className="px-4 pt-20 pb-48">
        <div className="container mx-auto">
          <PageTitle heading="Voici notre équipe">
            Etudiants en BUT Informatique à l'Université Gustave Eiffel
          </PageTitle>
          <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
            {teamData.map(({ img, name, position, socials }) => (
              <TeamCard
                key={name}
                img={img}
                name={name}
                position={position}
                socials={
                  <div className="flex items-center gap-2">
                    {socials.map(({ color, name, link }) => (
                        
                        <a href={link}>
                      <Button style={{backgroundColor: color}} >
                        {name === "Linkedin" ? (
                            <FontAwesomeIcon icon={faFaceAngry} className="mr-2" />
                        ) : (
                            <FontAwesomeIcon icon={faFaceAngry} className="mr-2" />
                        )}
                        {name}
                        </Button>

                        
                        
                        </a>
                    ))}
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>
    )
}