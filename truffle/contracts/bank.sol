pragma solidity ^0.4.13;

contract Bank{
    
    mapping(bytes32=>Coin) public ICO;
    address public owner = msg.sender;
    bytes32[] public list;
    struct Coin{
        bytes32 name;
        bytes32 symbol;
        uint upperCapAmount;
        bytes32 ownerShip;
        bytes32 filehash1;
        bytes32 filehash2;
        uint rating;
        uint status;
        mapping(address => uint) balances;
    }
    modifier onlyOwner() { 
        if (msg.sender == owner) 
            _;   
    }
    function createNewCoin(bytes32 _name,
        bytes32 _symbol,
        uint _upperCapAmount,
        bytes32 _ownerShip,
        bytes32 _filehash1,
        bytes32 _filehash2) onlyOwner() returns (bool success){

        Coin memory newCoin;
        newCoin.name = _name;
        newCoin.symbol = _symbol;
        newCoin.upperCapAmount =_upperCapAmount;
        newCoin.ownerShip=_ownerShip;
        newCoin.filehash1 = _filehash1;
        newCoin.filehash2 = _filehash2;
        newCoin.status = 1;
        list.push(_symbol);
        
        ICO[_symbol] = newCoin;
        return true;
    
    }
    
    function getStatus(bytes32 _coin) constant returns (uint){
        return ICO[_coin].status;
    }
    
    function setOwnerAmount(bytes32 _coin) returns (bool success){
        if(ICO[_coin].status >= 3){
            return false;
        }
        ICO[_coin].balances[owner]=ICO[_coin].upperCapAmount;
        return true;
    }
    function setStatus(bytes32 _coin,uint _status) onlyOwner() returns (bool success){
        if(ICO[_coin].symbol.length == 0 || ICO[_coin].status == 3 || ICO[_coin].status == 4 ){
            return false;
        }
        ICO[_coin].status = _status;
    }
    function setRating(bytes32 _coin,uint _rating) returns (bool success){
        if(ICO[_coin].status == 1){
            ICO[_coin].rating = _rating;
            ICO[_coin].status = 2;
            return true;
        }
        return false;
    }
    
    function balanceOf(bytes32 _coin,address _owner) constant returns (uint256 balance) {
         return ICO[_coin].balances[_owner];
    }

    function transfer(bytes32 _coin,address _to, uint _amount) returns (bool success) {
         if(ICO[_coin].symbol.length != 3){
            return false;
         }   
         mapping(address => uint256) balances = ICO[_coin].balances;
         if (balances[msg.sender] >= _amount 
             && _amount > 0
             && balances[_to] + _amount > balances[_to]) {
             balances[msg.sender] -= _amount;
             balances[_to] += _amount;
             return true;
         } else {
             return false;
         }
     }
     
     function getCoins() constant returns(bytes32[],bytes32[],uint[],bytes32[],uint[],uint[]){
        uint length = list.length;
        bytes32[] memory name = new bytes32[](length);
        bytes32[] memory symbol=new bytes32[](length);
        uint[] memory upperCapAmount=new uint[](length);
        bytes32[] memory ownerShip=new bytes32[](length);
        uint[] memory rating=new uint[](length);
        uint[] memory status=new uint[](length);
        
        for(uint i=0;i<length;i++){
            Coin memory obj;
            bytes32 _symbol = list[i];
            obj = ICO[_symbol];
            name[i]=obj.name;
            symbol[i]=obj.symbol;
            upperCapAmount[i]=obj.upperCapAmount;
            ownerShip[i]=obj.ownerShip;
            rating[i]=obj.rating;
            status[i]=obj.status;
        }
        return (name,symbol,upperCapAmount,ownerShip,rating,status);
     }
}