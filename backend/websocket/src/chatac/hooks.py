#! /usr/bin/env python3

from typing import Dict, List, Any, Union
import datetime
import subprocess
import requests
from requests.exceptions import HTTPError
import json

class ChatHooks(object):
    """
    Hook methods for the chatac server.
    Please inherit this class to implement the methods.
    All the methods are asynchronous; methods may invoke processes, web requests if required...
    Be careful to manage exceptions inside the methods: a hook method must not raise an exception.
    A hook method must also be executed in a reasonable time (less than a few seconds).
    Use timeouts if you can another async functions with a possible long run time.
    """
    async def on_server_start(self, params: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Called when the server starts.
        This method must return a dictionary of the waiting rooms (the key is the name of the room, the value the parameters).
        Waiting parameters are defined by a dictionary containing at least:
        - a field 'attendee_number' with the number of attendee in each chat session
        - an optional field 'description' with a detailed description of the room
        """
        raise NotImplementedError()

    async def on_client_connection(self, waiting_room_name: str, token: str) -> Union[dict, None, str]:
        """
        Return the identity of the client for the given token.
        The token is used to authenticate the client.
        If the token is valid, this hook must return the identity of the client.
        The identity is a Python dictionary containing at least a field 'name' with the display name of the client.
        If the token is invalid or if the client is not granted in the waiting room for any reason, 
        this hook must return None or a string with the reason of the invalidity.
        """
        raise NotImplementedError()

    async def on_chat_session_start(self, waiting_room_name: str, chat_session_id: int, attendee_identities: Dict[int, Dict[str, Any]]) -> Dict[str, Any]:
        """
        This hook is called when a new chat session starts.
        The waiting_room_index is the index of the waiting room used for this session;
        the index is the position of the room in the list returned by on_server_start.
        The chat_session_id is an integer identifying the chat session.
        The attendee_identities is a dict with the id of the attendees as keys and the identities of the attendees as values.
        The result of this method is a dictionary containing the following elements:
        - a field 'welcome_message' with a welcome message that will be transmitted to the attendees
        - a field 'duration' with the duration (in seconds) of the chat session
        """
        raise NotImplementedError()

    async def on_chat_message(self, chat_session_id: int, sender_id: int, content: Any) -> Dict[int, Any]:
        """
        This hook is triggered when a new chat message is sent by an attendee of the chat session.
        The sender_index is the index of the sender in the attendee_identities parameter of tne on_new_chat_session method.
        The content of the message is a data structure.
        It returns a dictionary; each key is a attendee index linked to the message that must be relayed to this attendee.
        This way we can filter and/or modify the messages that can be retransmitted.
        """
        raise NotImplementedError()

    async def on_attendee_leave(self, chat_session_id: int, attendee_id: int):
        """
        This hook is called when an attendee leaves the chat session.
        """
        raise NotImplementedError()

    async def on_chat_session_end(self, chat_session_id: int) -> Any:
        """
        This hook is called when the chat session ends.
        The result of this method is a structure that is transmitted as an exit message to all the attendees.
        """
        raise NotImplementedError()


class ZoogleChatHooks(ChatHooks):
    DEFAULT_WELCOME_MESSAGE = "Welcome everybody!"
    DEFAULT_DURATION = 60
    DEFAULT_LANG = "FRA"
    DEFAULT_GRID_LENGTH = 4
    DEFAULT_ATTENDEE_NUMBER=2
    DEFAULT_ROOMS = {
        "default": {
            "mode":0, 
            "attendee_number": 2, 
            "duration": 60, 
            "welcome_message": "Salut everybody tout le monde !", 
            "lang":"FRA", 
            "grid_length":4,
            "color":"#",
            "image_realist":"",
            "image_cartoon":"",
            "rule":"Rentrez des motsd, faites des points"
            },
        "solo": {
            "mode":0, 
            "attendee_number": 1, 
            "duration": 5, 
            "welcome_message": "Salut toi !", 
            "lang":"FRA", 
            "grid_length":4,
            "color":"#",
            "image_realist":"",
            "image_cartoon":"",
            "rule":"Rentrez des motsd, faites des points"
            },
        "4": {
            "mode":0, 
            "attendee_number": 3, 
            "duration": 120, 
            "welcome_message": "!", 
            "lang":"FRA",
            "grid_length":4,
            "color":"#",
            "image_realist":"",
            "image_cartoon":"",
            "rule":"Rentrez des motsd, faites des points"
            },
        "Aigle": {
            "mode":1, 
            "attendee_number": 2, 
            "duration": 240, 
            "welcome_message": "!", 
            "lang":"FRA",
            "grid_length":4,
            "color":"#",
            "image_realist":"",
            "image_cartoon":"",
            "rule":"Rentrez des motsd, faites des points"
            }
        }
    EXEC_PATH = "..\server\game_motor\executables_WIN"
# \Zoo-ggle\\backend\server\game_motor\executables_WIN

    class AttendeeInfo(object):
        def __init__(self, identity):
            self.identity = identity
            self.has_left = False
            self.message_number = 0
            self.char_number = 0
            self.score = 0
            self.validWords=[]
            self.falseWords=[]

    def __init__(self):
        self._rooms: Dict[str, Dict[str, Any]] = {}
        self._attendees: Dict[int, List[AttendeeInfo]] = {}

    async def on_server_start(self, params: Dict[str, Any]) -> List[Dict[str, Any]]:
        self._rooms = params.get('rooms', self.DEFAULT_ROOMS)
        return self._rooms

    async def on_client_connection(self, waiting_room_name: str, token: str) -> Union[dict, None, str]:
        """We consider that the token is the nickname that is proposed by the user"""
        if token.strip() == '':
            return "the nickname cannot be empty"
        elif waiting_room_name not in self._rooms:
            return f"the waiting room {waiting_room_name} is unknown"
        else:
            data = await self.getPlayerByToken(token)
            if data == None:
                return "Invalid token"
            else:
                return {"name": data["name"], "token": data["token"], "DatabaseId": data["id"]}

    async def getPlayerByToken(self, token:str):
        try:
            url = 'http://localhost/backend/api/game/getPlayerByToken.php'
            myobj = {'token': token}
            response = requests.post(url, data = myobj)
            response.raise_for_status()
            jsonResponse = response.json()
            print("Entire JSON response")
            print(jsonResponse)
            if (jsonResponse.get("success")):
                data = {"name":jsonResponse.get("pseudo"),"token":token,"id":jsonResponse.get("id")}
                return data
            else:
                return None                
        except HTTPError as http_err:
            print(f'HTTP error occurred: {http_err}')
            return None
        except Exception as err:
            print(f'Other error occurred: {err}')   
            return None

    async def on_chat_session_start(self, waiting_room_name: str, chat_session_id: int, attendee_identities: Dict[int, Dict[str, Any]]) -> Any:
        self._attendees[chat_session_id] = {id: self.AttendeeInfo(x) for (id, x) in attendee_identities.items()}
        room = self._rooms[waiting_room_name]

        grid_length = room.get("grid_length", self.DEFAULT_GRID_LENGTH)
        process = subprocess.Popen([self.EXEC_PATH+'\grid_build', self.EXEC_PATH+'\..\..\data\\frequences.txt', str(grid_length), str(grid_length)], stdout=subprocess.PIPE)
        output, error = process.communicate()
        grid = output.decode()
        grid = grid.strip()
        
        cmd = [self.EXEC_PATH+'\solve.exe',self.EXEC_PATH+'\..\..\data\listeMotWindows.lex','3', str(grid_length), str(grid_length)] + grid.split(" ")
        process = subprocess.Popen(cmd, stdout=subprocess.PIPE)
        output, error = process.communicate()
        solutionsString = output.decode()
        solutions = solutionsString.strip().split(" ")
        print(solutions)
        return {
            "welcome_message": room.get("welcome_message", self.DEFAULT_WELCOME_MESSAGE), 
            "duration": room.get("duration", self.DEFAULT_DURATION),
            "grid": grid,
            "solutions": solutions,
            "lang": room.get("lang", self.DEFAULT_LANG),
            "begin": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "playerNumber" : room.get("attendee_number", self.DEFAULT_ATTENDEE_NUMBER),
            "mode":room.get("mode",0),
            "grid_length":room.get("grid_length",self.DEFAULT_GRID_LENGTH),
            "name":waiting_room_name,
        }

    async def on_chat_message(self, chat_session_id: int, sender_id: int, content: Any) -> Dict[int, Any]:
        # update the stats

        attendee = self._attendees[chat_session_id][sender_id]
        attendee.message_number += 1
        attendee.char_number += len(str(content))

        i = 0
        result = {}
        for (id, a) in self._attendees[chat_session_id].items():
            if not a.has_left:
                result[id] = content
        return result
    
    
    async def on_word_proposed(self, chat_session_id: int, attendee_id: int, word: str, isValidWord: bool, mode: int):
        attendee = self._attendees[chat_session_id][attendee_id]
        date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        isAnimal = False
        if mode==1:
            for player_id in self._attendees[chat_session_id]:
                currentAttendee = self._attendees[chat_session_id][player_id]
                for currentWord in currentAttendee.validWords:
                    if currentWord[0] == word:
                        return {"already_found":True,"word":word, "player":currentAttendee.identity["name"]}
        if (isValidWord):
            try:
                url = 'http://localhost/backend/api/game/getScoreforAWord.php'
                myobj = {'word': word}
                response = requests.post(url, data = myobj)
                response.raise_for_status()
                jsonResponse = response.json()
                print("Entire JSON response")
                print(jsonResponse)
                score = jsonResponse.get("score")
                isAnimal = jsonResponse.get("isAnimal")
                attendee.score+=score
                attendee.validWords.append([word,date])
            except HTTPError as http_err:
                print(f'HTTP error occurred: {http_err}')
            except Exception as err:
                print(f'Other error occurred: {err}')   

            if (mode==1):
                return {"already_found":False,"player":attendee.identity["name"],"score":score, "word":word,"isAnimal":isAnimal }

            return {"already_found":False,"score":score, "word":word,"isAnimal":isAnimal }
        else:
            attendee.falseWords.append([word,date])

        result = {"already_found":False,"score":attendee.score, "validWords":attendee.validWords, "falseWords":attendee.falseWords, "isAnimal":isAnimal}
        return result

    async def on_attendee_leave(self, chat_session_id: int, attendee_id: int):
        self._attendees[chat_session_id][attendee_id].has_left = True

    async def on_chat_session_end(self, chat_session_id: int, info: Dict[str, Any]) -> Any:
        """Send the stats for the session"""
        attendees = self._attendees[chat_session_id]
        infoPerson=[]
        for key,attendee in attendees.items():
            dico = {"id":attendee.identity["DatabaseId"],"validWords":attendee.validWords, "falseWords":attendee.falseWords, "score":attendee.score}
            infoPerson.append(dico)

        stats = [f"{a.identity['name']} got {a.score} he proposed {a.validWords} and {a.falseWords}" for a in attendees.values()] 
        joined = "\n".join(stats)

        try:
            url = 'http://localhost/backend/api/game/insertEndGame.php'
            myobj = {'infoPartie': json.dumps(info), 'infoJoueurs':json.dumps(infoPerson)}
            response = requests.post(url, data = myobj)
            print(response._content)
            print(response.text)
            print(response.text())
            print(response.content)
            response.raise_for_status()
            print(response.json())
        except HTTPError as http_err:
            print(f'HTTP error occurred: {http_err}')
        except Exception as err:
            print(f'Other error occurred: {err}')  
        
        
        return f"Did you know that: {joined}"
    


# class DefaultChatHooks(ChatHooks):
#     DEFAULT_WELCOME_MESSAGE = "Welcome everybody!"
#     DEFAULT_DURATION = 60
#     DEFAULT_ROOMS = {"default": {"attendee_number": 2, "duration": 60, "welcome_message": "Welcome everybody!"}}

#     class AttendeeInfo(object):
#         def __init__(self, identity):
#             self.identity = identity
#             self.has_left = False
#             self.message_number = 0
#             self.char_number = 0

#     def __init__(self):
#         self._rooms: Dict[str, Dict[str, Any]] = {}
#         self._attendees: Dict[int, List[AttendeeInfo]] = {}

#     async def on_server_start(self, params: Dict[str, Any]) -> List[Dict[str, Any]]:
#         self._rooms = params.get('rooms', self.DEFAULT_ROOMS)
#         return self._rooms

#     async def on_client_connection(self, waiting_room_name: str, token: str) -> Union[dict, None, str]:
#         """We consider that the token is the nickname that is proposed by the user"""
#         if token.strip() == '':
#             return "the nickname cannot be empty"
#         elif waiting_room_name not in self._rooms:
#             return f"the waiting room {waiting_room_name} is unknown"
#         else:
#             return {"name": token}

#     async def on_chat_session_start(self, waiting_room_name: str, chat_session_id: int, attendee_identities: Dict[int, Dict[str, Any]]) -> Any:
#         self._attendees[chat_session_id] = {id: self.AttendeeInfo(x) for (id, x) in attendee_identities.items()}
#         room = self._rooms[waiting_room_name]
#         return {
#             "welcome_message": room.get("welcome_message", self.DEFAULT_WELCOME_MESSAGE), 
#             "duration": self._rooms[waiting_room_name].get("duration", self.DEFAULT_DURATION)
#         }

#     async def on_chat_message(self, chat_session_id: int, sender_id: int, content: Any) -> Dict[int, Any]:
#         # update the stats

#         attendee = self._attendees[chat_session_id][sender_id]
#         attendee.message_number += 1
#         attendee.char_number += len(str(content))

#         i = 0
#         result = {}
#         for (id, a) in self._attendees[chat_session_id].items():
#             if not a.has_left:
#                 result[id] = content
#         return result

#     async def on_attendee_leave(self, chat_session_id: int, attendee_id: int):
#         self._attendees[chat_session_id][attendee_id].has_left = True

#     async def on_chat_session_end(self, chat_session_id: int) -> Any:
#         """Send the stats for the session"""
#         attendees = self._attendees[chat_session_id]
#         stats = [f"{a.identity['name']} sent {a.message_number} messages with {a.char_number} chars" for a in attendees.values()] 
#         joined = "\n".join(stats)
#         return f"Did you know that: {joined}"


# class UppercaseChatHooks(ChatHooks):
    # """
    # Version of chat hooks that relays all the chat messages in uppercase
    # """
    # async def on_chat_message(self, chat_session_id: int, sender_id: int, content: Any) -> Dict[int, Any]:
    #     result = super(self).on_chat_message(chat_session_id, sender_id, content)

    #     def to_upper(s):
    #         return s.upper() if isinstance(s, str) else s
            
    #     return {k: to_upper(v) for (k, v) in result.items()}