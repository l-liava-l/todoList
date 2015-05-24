(function(){
	module.exports = init;
	
	function init(core, db){
		core.get('/api/', function (req, res) {
		  res.send('Hello World!');
		});
	}
})();