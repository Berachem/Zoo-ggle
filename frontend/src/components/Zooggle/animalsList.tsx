import { faArrowRight, faLink, faMinimize, faPlus, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

const ANIMALS_LIST_API_URL =
  "https://zoo-ggle.berachem.dev/V2/api/animals/searchAnimals.php";
const PIXABAY_API_URL =
  "https://pixabay.com/api/?key=28191618-66afcd90e16f1c5987dbd6cd4&q=";

interface Animal {
  name: string;
  linkImage: string;
}

const AnimalList = () => {
  const [animalListNames, setAnimalListNames] = useState<string[]>([]); // new state variable
  const [animalList, setAnimalList] = useState<Animal[]>([]);
  const [loadingAnimals, setLoadingAnimals] = useState<string[]>([]); // new state variable
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  useEffect(() => {
    fetch(ANIMALS_LIST_API_URL)
      .then((response) => response.json())
      .then((dataAnimals) => {
        setAnimalListNames(dataAnimals.animals.map((animal: any) => animal));

          /* for (let i = 0; i < animalListNames.length; i++) {
            setLoadingAnimals((prevLoadingAnimals) => [...prevLoadingAnimals, animalListNames[i]]); // add animal to loadingAnimals
            fetch(`${PIXABAY_API_URL}${animalListNames[i]}&image_type=photo&pretty=true`)
              .then((response) => response.json())
              .then((dataImage) => {
                setLoadingAnimals((prevLoadingAnimals) => prevLoadingAnimals.filter((animal) => animal !== animalListNames[i])); // remove animal from loadingAnimals
                animalList.push({
                  name: animalListNames[i],
                  linkImage: dataImage.hits[0].largeImageURL,
                });
                setAnimalList(animalList);

              }); 
          } */
      });
  }, []);

  
  return (
    <div>
      {Array.from(Array(26)).map((_, index) => {
        const letter = String.fromCharCode(65 + index); // Convertit l'index en lettre de l'alphabet
        const animalsStartingWithLetter = animalListNames.filter(
          (animal: string) => animal.startsWith(letter)
        ); // Filtrer la liste des animaux pour ceux qui commencent par la lettre actuelle
        if (animalsStartingWithLetter.length === 0) return null; // Si la liste est vide, ne pas afficher la catégorie
        if (isCollapsed && letter !== "A") return null; // Si la liste est réduite, ne pas afficher les lettres après A (pour éviter de charger trop d'images
        return (
          <div key={letter} className="mb-10">
            <h2 className="mb-4 text-2xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              {letter}
            </h2>
            <div className="flex flex-wrap -mx-1 lg:-mx-4">
              {animalsStartingWithLetter.map((animal: string) => (
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                  <a
                    href={`https://www.google.com/search?q=${animal}`}
                    target="_blank"
                  >
                    {/*  
                    <img src= {"https://www.projetcartylion.fr/app/uploads/2020/08/Placeholder.png"} className="w-full none hover:display-block" style={{display : "none"}}/>                
                    */}
                    <article className="overflow-hidden rounded-lg shadow-lg">
                      <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                        <h1 className="text-lg">
                          {animal}{" "}
                          <FontAwesomeIcon
                            icon={faLink}
                            className="text-gray-500 hover:text-green-700"
                          />
                        </h1>
                      </header>
                    </article>
                  </a>
                </div>
              ))}
            </div>
            {isCollapsed && letter === "A" && ( 
              <div className="flex justify-center mt-4">
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                    onClick={() => setIsCollapsed(false)}
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Afficher plus
                </button>
              

              </div>
            )}
            {!isCollapsed && letter === "Z" && ( 
              <div className="flex justify-center mt-4">
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"  
                    onClick={() => setIsCollapsed(true)}
                >
                  <FontAwesomeIcon icon={faMinimize} className="mr-2" />
                  Afficher moins
                </button>
              </div>
            )}
          </div>
          
        );
      })}
    </div>
  );
};

export default AnimalList;
