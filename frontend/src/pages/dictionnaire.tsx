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

const API_URL_ENG = "https://api.dictionaryapi.dev/api/v2/entries/en";
const API_URL_FR =
  "http://localhost:3000/backend/api/getDefinitionOfWord?word=";

function Dictionnaire() {
  const [language, setLanguage] = useState("en");
  const [searchTerm, setSearchTerm] = useState("");
  const [definitionsENG, setDefinition] = useState([]);
  const [definitionDataFR, setDefinitionFR] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setDefinitionFR(data);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== "") {
        searchDefinition();
      }
    }, 200);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, language]);

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

  const handleCopy = () => {
    toast.success(" Lien copié !");
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
  };

  const isDefinitionAvailableENG = definitionsENG.length > 0;
  const isDefinitionAvailableFR = definitionDataFR !== "";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <ToastContainer />

      <div
        className="flex flex-col items-center justify-center w-full max-w-2xl px-4 py-6 space-y-4 rounded-lg shadow-xl border-2 border-white
      "
        style={{
          width: "70%",
          marginTop: "50px",
          backdropFilter: "blur(40px)",
          color: "white",
          backgroundColor: "#00000013",
        }}
      >
        <h1 className="text-4xl font-bold mb-2" style={{ color: "white" }}>
          <FontAwesomeIcon
            icon={faBook}
            className="mr-4"
            color="white"
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
            style={{ marginRight: "3.5px" }}
          />
          <Radio
            color="blue"
            id="french"
            name="language"
            value="fr"
            checked={language === "fr"}
            onChange={(e) => setLanguage(e.target.value)}
            labelProps={{ className: "text-white" }}
            style={{ marginRight: "3.5px" }}
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
          <p className="text-center text-sm text-white font-bold">
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
          <p className="text-center text-sm text-white font-bold">
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
              <span onClick={handleCopy} className="cursor-pointer">
                <h1 className="text-2xl font-bold mb-2 bg-green-800 p-2 text-white rounded-full">
                  {searchTerm}
                  <FontAwesomeIcon
                    icon={faLink}
                    className="ml-2"
                    color="white"
                    style={{ marginRight: "0.5rem" }}
                  />
                </h1>
              </span>

              {definitionsENG.map((definition: any, index: number) => (
                <div
                  key={index}
                  className="mt-4 shadow-xl rounded-lg p-4"
                  style={{ backgroundColor: "lightgreen" }}
                >
                  <h1 className="text-xl font-bold mb-2 text-justify">
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
            <div className="mt-4">
              {/* <CopyToClipboard text={currentUrl} onCopy={handleCopy}>
                            <Button
                                color="light-green"
                                className="w-96"
                            >
                                Copier le lien
                            </Button>
                        </CopyToClipboard> */}
              {/*    <Button color="light-green" className="w-96" onClick={() => {navigator.clipboard.writeText(currentUrl);}} /> */}
            </div>
          </div>
        </div>
      )}

      {isDefinitionAvailableFR && searchTerm !== "" && language === "fr" && (
        <div className="mt-4">
          <h1>{searchTerm}</h1>
          <div className="mt-4 shadow-xl rounded-lg p-4">
            <p className="mb-2 text-justify">{definitionDataFR}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dictionnaire;
