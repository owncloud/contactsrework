angular.module('contactsApp')
.controller('contactCtrl', function($route, $routeParams, SortByService, ContactService, $scope) {
	var ctrl = this;

	ctrl.starred = ctrl.contact.categories().indexOf(t('contacts', 'Favourites')) !== -1 ? true : false;
	ContactService.registerObserverCallback(function(ev) {
		$scope.$apply(function() {
			if (ev.event === 'update') {
				ctrl.starred = ctrl.contact.categories().indexOf(t('contacts', 'Favourites')) !== -1 ? true : false;
			}
		});
	});

	ctrl.openContact = function() {
		$route.updateParams({
			gid: $routeParams.gid,
			uid: ctrl.contact.uid()});
	};

	ctrl.getName = function() {
		// If lastName equals to firstName then none of them is set
		if (ctrl.contact.lastName() === ctrl.contact.firstName()) {
			return ctrl.contact.displayName();
		}

		if (SortByService.getSortBy() === 'sortLastName') {
			return (
				ctrl.contact.lastName() + ', '
				+ ctrl.contact.firstName() + ' '
				+ ctrl.contact.additionalNames()
			).trim();
		}

		if (SortByService.getSortBy() === 'sortFirstName') {
			return (
				ctrl.contact.firstName() + ' '
				+ ctrl.contact.additionalNames() + ' '
				+ ctrl.contact.lastName()
			).trim();
		}

		return ctrl.contact.displayName();
	};
});
