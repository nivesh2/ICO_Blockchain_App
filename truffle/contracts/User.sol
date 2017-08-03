pragma solidity ^0.4.13;

contract User{
    mapping (bytes32 => Person) public people;
    uint peopleCount = 0;
    
    struct Person {
        bytes32 email;
        bytes32 password;
        bytes32 filehash1;
        bytes32 filehash2;
        uint status;
        uint fundraiser_amount;
    }
    
    function addUser(bytes32 _email, bytes32 _password ) returns (bool success){
        if(people[_email].password == _password){
            return false;
        }
        Person memory newPerson;
        newPerson.email=_email;
        newPerson.password=_password;
        newPerson.status=0;
        
        people[_email]= newPerson;
        peopleCount+=1;
        return true;
    }
    
    function authenticateUser(bytes32 _email, bytes32 _password) constant returns (bool success){
        if(people[_email].password != _password){
            return false;
        }
        return true;
    }
    
    function getUserDetails(bytes32 _email) constant returns (bytes32,bytes32,bytes32,bytes32,uint,uint){
        if(people[_email].email.length == 0){
            revert();
        }
        return (people[_email].email,people[_email].password,people[_email].filehash1,people[_email].filehash2,people[_email].fundraiser_amount,people[_email].status);
    }
    
    function setFilehash1(bytes32 _email, bytes32 _filehash) returns(bool success){
        people[_email].filehash1 = _filehash;
        return true;
    }

    function setFilehash2(bytes32 _email, bytes32 _filehash) returns(bool success){
        people[_email].filehash2 = _filehash;
        return true;
    }
    function setFundraiserAmount(bytes32 _email, uint _amount) returns(bool success){
        people[_email].fundraiser_amount = _amount;
        return true;
    }
    function setStatus(bytes32 _email,uint _status) returns (bool success){
        people[_email].status = _status;
        return true;
    }
    
    
    function getPeopleCount() constant returns (uint count){
        return peopleCount;
    }
}