(function(){
	module.exports = init;
	
	function init(express, db){
		express.get('/api/', function (req, res) {
		  res.send('Hello World!');
		});
	}
})();