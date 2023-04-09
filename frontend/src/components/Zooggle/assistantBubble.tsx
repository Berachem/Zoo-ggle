import { faAngleDoubleUp, faQuestion, faRandom } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

const BubbleAssistant = () => {
    const funFacts = [
        "La girafe peut nettoyer ses oreilles avec sa langue qui mesure 45 cm de long.",
        "Le paresseux peut se noyer en buvant de l'eau.",
        "Le narval est surnommé 'licorne des mers' en raison de sa défense torsadée en forme de corne.",
        "Le lézard est capable de perdre sa queue lorsqu'il est attaqué, qui peut ensuite repousser.",
        "Les kangourous ne peuvent pas reculer et doivent sauter en arrière pour se déplacer.",
        "Les yeux d'un autruche sont plus grands que son cerveau.",
        "Le tapir est le seul animal avec un nez préhensile, c'est-à-dire qu'il peut l'utiliser pour attraper des objets.",
        "Les chameaux stockent de l'eau dans leur bosse pour survivre dans les régions arides.",
        "Le pangolin est l'animal le plus trafiqué au monde en raison de la demande pour sa chair et ses écailles.",
        "Le cacatoès est capable de danser en battant des ailes sur de la musique.",
        "Les fourmis peuvent porter jusqu'à 50 fois leur propre poids.",
        "Le caméléon peut projeter sa langue deux fois plus loin que sa propre longueur pour attraper sa proie.",
        "Le koala dort en moyenne 18 heures par jour.",
        "La pieuvre a trois cœurs et ne peut pas vivre en captivité car elle s'ennuie facilement.",
        "Le kangourou roux est le plus grand marsupial au monde.",
        "Les dauphins sont capables de se reconnaître dans un miroir, ce qui prouve leur capacité à avoir conscience d'eux-mêmes.",
        "Le zèbre a des rayures uniques, semblables à des empreintes digitales humaines.",
        "La taupe est aveugle, mais elle peut voir la lumière.",
        "L'éléphant a la meilleure mémoire de tous les animaux.",
        "Le panda géant ne digère pas bien le bambou et doit en manger une grande quantité pour obtenir suffisamment de nutriments.",
        "Le suricate est un animal social qui vit en clans de jusqu'à 30 individus.",
        "Le crocodile peut fermer ses narines lorsqu'il est sous l'eau pour éviter l'entrée d'eau.",
        "Les grenouilles peuvent sauter jusqu'à 20 fois leur propre longueur corporelle en une seule fois.",
        "Le renard arctique change de couleur en hiver pour se fondre dans la neige et en été pour se camoufler dans l'herbe.",
        "Le requin est le plus ancien poisson vivant au monde.",
        "Le pingouin empereur est le plus grand de tous les pingouins.",
        "Les abeilles communiquent entre elles en dansant.",
        "Les gorilles peuvent se tenir debout sur leurs pattes arrière pour atteindre des objets en hauteur.",
        "Le papillon monarque migre chaque année sur des milliers de kilomètres vers le Mexique et retourne en Amérique du Nord au printemps.",
        "Les serpents sont capables de sentir les vibrations sonores et peuvent même entendre les battements de leur proie.",
        "Les chauves-souris sont les seuls mammifères volants.",
    ];
      
  const [showFact, setShowFact] = useState(false);
  const [randomFact, setRandomFact] = useState('')

  const toggleAssistant = () => {
    setShowFact(!showFact);
    setRandomFact(funFacts[Math.floor(Math.random() * funFacts.length)])
  };

  const changeFact = () => {
    setRandomFact(funFacts[Math.floor(Math.random() * funFacts.length)])
    }
    

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        className="flex items-center justify-center bg-green-700 text-white rounded-full w-16 h-16"
        onClick={toggleAssistant}
      >
       <FontAwesomeIcon icon={faQuestion} size='2x' className='text-white' />
      </button>
      {showFact && (
        <div className="absolute bottom-20 right-5 w-80 h-45 p-4 bg-white text-black rounded-lg shadow-lg z-100 text-center">
            <h1 className="text-xl font-bold text-green-700"
            >Le saviez-vous ?</h1>
          <p>
            {randomFact}
          </p>
          <button
            className="flex items-center justify-center w-8 h-8" onClick={changeFact}
            >
            <FontAwesomeIcon icon={faRandom} size='2x'  className='text-green-700' />
            </button>

         
                
        </div>
      )}
    </div>
  );
};

export default BubbleAssistant;
