import { faArrowRight, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { BounceLoader } from 'react-spinners';

const ANIMALS_LIST_API_URL = "https://zoo-ggle.berachem.dev/V2/api/animals/searchAnimals.php";
const PIXABAY_API_URL = "https://pixabay.com/api/?key=28191618-66afcd90e16f1c5987dbd6cd4&q=";




interface Animal {
    name: string;
    linkImage: string;
  }
  
  const AnimalList = () => {
    const [animalListNames, setAnimalListNames] = useState<string[]>([]); // new state variable
    const [animalList, setAnimalList] = useState<Animal[]>([]);
    const [loadingAnimals, setLoadingAnimals] = useState<string[]>([]); // new state variable
  
    useEffect(() => {
      fetch(ANIMALS_LIST_API_URL)
        .then((response) => response.json())
        .then((dataAnimals) => {

        setAnimalListNames(dataAnimals.animals.map((animal: any) => animal));
  
         /*  for (let i = 0; i < animalListNames.length; i++) {
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
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
    {animalListNames.map((animal: any) => (
            <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
              <a href={`https://www.google.com/search?q=${animal}`} target="_blank">
              <article className="overflow-hidden rounded-lg shadow-lg">
               {/*  {loadingAnimals.includes(animal.name) && ( // conditional rendering of loader
                  <div className="h-64 flex justify-center items-center">
                    <BounceLoader color="#4F46E5" loading={true} size={50} />
                  </div>
                )} */}
                
                 {/*  <img alt="Placeholder" className="block h-auto w-full"
                   src={animal.linkImage} /> */}
                
                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                  <h1 className="text-lg">
                      {animal}
                      {" "}
                      <FontAwesomeIcon icon={faLink} className="text-gray-500 hover:text-green-700" />
                  </h1>
                </header>
              </article>
              </a>
            </div>
          ))}
        
      </div>
    );
  };
  
  export default AnimalList;
  
  

