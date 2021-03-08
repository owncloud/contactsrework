angular.module('contactsApp')
.filter('vCard2JSON', function() {
	return function(input) {
		var result = vCard.parse(input);

		var key = 'tel';
		if(typeof result[key] !== 'undefined') {
			var newMetaArr = [];
			var tels = result[key];
			tels.forEach(function (item) {
				var meta = item.meta.type;
				// TYPE=VOICE;TYPE=CELL --> CELL
				if(meta.length == 2 && meta.includes('VOICE') && meta.includes('CELL')) {
					var newMetaArr = ['CELL'];
					item.meta.type = newMetaArr;
				}

				// TYPE=VOICE;TYPE=HOME --> HOME,VOICE
				if(meta.length == 2 && meta.includes('VOICE') && meta.includes('HOME')) {
					newMetaArr = ['HOME,VOICE'];
					item.meta.type = newMetaArr;
				}
			});
		}

		return result;
	};
});
