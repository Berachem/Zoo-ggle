import { useState, useEffect, useMemo } from "react";
import Input from "../components/Zooggle/Input";
import PulseLoader from "react-spinners/PulseLoader";
import debounce from "lodash.debounce";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faBook,
  faExclamationCircle,
  faLink,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Radio, Select } from "@material-tailwind/react";
import '../css/dictionnaire.css'
import React from "react";

const API_URL_ENG = "https://api.dictionaryapi.dev/api/v2/entries/en";
const API_URL_FR = "http://localhost/backend/api/getDefinitionOfWord.php?word=";

function Dictionnaire() {
  const [language, setLanguage] = useState("en");
  const [searchTerm, setSearchTerm] = useState("");
  const [definitionsENG, setDefinition] = useState([]);
  const [definitionDataFR, setDefinitionFR] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundMode, setBackgroundMode] = React.useState(
    localStorage.getItem("BackgroundMode") === "true"
  );

  const images = [
    "https://i.ibb.co/C5gh8yW/istockphoto-1152485418-612x612.jpg",
    "https://media.istockphoto.com/id/523057192/photo/smart-cat.jpg?b=1&s=170667a&w=0&k=20&c=HdBAsBhQEDQ59Cgwk9SUbXF-o1eraJwpUMOmDU91wAA=",
  ]

  const yamlStringToFilteredAray = (yamlString: string) => {
    const myarray = yamlString.split("<br>")
    const filteredArray = myarray.filter((item) => (/- [^\n]/).test(item))
    return filteredArray;
  };
  
  const searchDefinitionEn = async () => {
    const response = await fetch(`${API_URL_ENG}/${searchTerm}`);
    const data = await response.json();
    console.log(data);
    if (data.title === "No Definitions Found") {
      setDefinition([]);
    } else {
      const newDefinitions = data[0].meanings.map((meaning: any) => {
        return {
          partOfSpeech: meaning.partOfSpeech,
          definitions: meaning.definitions.map(
            (definition: any) => definition.definition
          ),
          examples: meaning.definitions.map(
            (definition: any) => definition.example
          ),
        };
      });
      setDefinition(newDefinitions);
    }
  };

  const searchDefinitionFr = async () => {
    const response = await fetch(`${API_URL_FR}${searchTerm}`);
    const data = await response.json(); // string yaml format
    console.log(data);
    if (data.success) {
      setDefinitionFR(data.definition);
    }else{
      setDefinitionFR("")
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== "") {
        searchDefinition();
      }
    }, 200);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, language]);

  useEffect(() => {
    function changeBG() {
      setBackgroundMode( localStorage.getItem("BackgroundMode") === "true");
      console.log("backgroundMode", backgroundMode);
    }
  
    window.addEventListener('storage', changeBG)
  
    return () => {
      window.removeEventListener('storage', changeBG)
    }
  }, [])


  

  const searchDefinition = async () => {
    setIsLoading(true);
    switch (language) {
      case "en":
        await searchDefinitionEn();
        break;
      case "fr":
        await searchDefinitionFr();
        break;
      default:
        break;
    }

    setIsLoading(false);
  };

  const isDefinitionAvailableENG = definitionsENG.length > 0;
  const isDefinitionAvailableFR = definitionDataFR !== "";

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <ToastContainer />

      <div
        className="flex flex-col items-center justify-center w-full max-w-2xl px-4 py-6 space-y-4 rounded-lg shadow-xl border-2 border-white"
      
        style={{
          width: "70%",
          marginTop: "100px",
          opacity: "0.95",
          color: "white",
          backgroundColor: "white",
        }}
      >
        <img src={images[backgroundMode ? 1 : 0]} alt="book" width="200" height="200" />


        <h1 className="text-4xl font-bold mb-2" style={{ color: "black" }}>
          <FontAwesomeIcon
            icon={faBook}
            className="mr-4"
            style={{ marginRight: "0.5rem" }}
          />
          Dictionnaire
        </h1>


        {/* Radios diplayed in line for "Anglais" et "Francais" */}
        <div className="flex flex-row">
          <img
            alt="United Kingdom"
            src="http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg"
            width="48"
            height="32"
          />

          <Radio
            color="red"
            id="english"
            name="language"
            value="en"
            checked={language === "en"}
            onChange={(e) => setLanguage(e.target.value)}
            labelProps={{ className: "text-white" }}
            style={{ marginRight: "5px" }}
          />
          <Radio
            color="blue"
            id="french"
            name="language"
            value="fr"
            checked={language === "fr"}
            onChange={(e) => setLanguage(e.target.value)}
            labelProps={{ className: "text-white" }}
            style={{ marginRight: "5px" }}
          />
          <img
            alt="France"
            src="http://purecatamphetamine.github.io/country-flag-icons/3x2/FR.svg"
            width="48"
            height="32"
          />
        </div>

        <Input
          label={"Tapez un mot"}
          type={"text"}
          placeholder={"try..."}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {language === "en" && (
          <p className="text-center text-sm text-black font-bold">
            Les définitions
            <span className="text-red-500"> Anglaises </span>
            sont fournies par{" "}
            <a
              href="https://dictionaryapi.dev/"
              target="_blank"
              rel="noreferrer"
              className="text-red-500 hover:text-blue-600"
            >
              dictionaryapi.dev
            </a>
          </p>
        )}

        {language === "fr" && (
          <p className="text-center text-sm text-black font-bold">
            Les définitions
            <span className="text-blue-500"> Françaises </span>
            sont fournies par le{" "}
            <a
              href="https://fr.wiktionary.org/wiki/Wiktionnaire:Page_d%E2%80%99accueil"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              Wiktionnaire
            </a>{" "}
            sur lequel nous avons effectué un algorithme de recherche de
            définitions.
          </p>
        )}
      </div>

      {!isDefinitionAvailableENG &&
        !isDefinitionAvailableFR &&
        searchTerm !== "" &&
        !isLoading && (
          <div className="mt-4 bg-white rounded-lg shadow-xl w-full max-w-2xl px-4 py-6 space-y-4 justify-items-center">
            <h1 className="text-2xl font-bold mb-2">
              <FontAwesomeIcon
                icon={faExclamationCircle}
                className="mr-2"
                color="orange"
                style={{ marginRight: "0.5rem" }}
              />
              Aucune définition trouvée
            </h1>
          </div>
        )}

      {isLoading && (
        <div className="mt-4">
          <PulseLoader color="#00BFA6" />
        </div>
      )}
      {isDefinitionAvailableENG && searchTerm !== "" && language === "en" && (
        <div className="mt-4">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2 p-2 text-white rounded-full" style={{ backgroundColor: "#579A86" }}>
                {searchTerm}
              </h1>

              {definitionsENG.map((definition: any, index: number) => (
                <div
                  key={index}
                  className="mt-4 shadow-xl rounded-lg p-4"
                  style={{ backgroundColor: "white" }}
                >
                  <h1 className="text-xl font-bold mb-2 text-justify" style={{ color: "#579A86" }}>
                    {definition.partOfSpeech === "noun"
                      ? "nom"
                      : definition.partOfSpeech === "verb"
                      ? "verbe"
                      : definition.partOfSpeech === "adjective"
                      ? "adjectif"
                      : definition.partOfSpeech === "adverb"
                      ? "adverbe"
                      : definition.partOfSpeech === "preposition"
                      ? "préposition"
                      : definition.partOfSpeech === "conjunction"
                      ? "conjonction"
                      : definition.partOfSpeech}
                  </h1>

                  {definition.definitions.map(
                    (definition: any, index: number) => (
                      <div key={index}>
                        <p className="mb-2 text-justify">
                          {index + 1}. {definition}
                        </p>
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isDefinitionAvailableFR && searchTerm !== "" && language === "fr" && (
        <div className="mt-4">
          <div className="flex flex-col items-center">
            
              <h1 className="text-2xl font-bold mb-2 p-2 text-white rounded-full" style={{ backgroundColor: "#579A86" }}>
                {searchTerm}
              </h1>

              <div
                key={definitionDataFR}
                className="mt-4 shadow-xl rounded-lg p-4"
                style={{ backgroundColor: "white", color: "black" }}
              >
                {yamlStringToFilteredAray(definitionDataFR).map(s =>  <><span key={s} > {s}</span><br/></>)}
              </div>
            
          </div>
        </div>
      )}
    </div>
  );
}

export default Dictionnaire;
