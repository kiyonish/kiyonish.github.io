var EventDispatcher = EventDispatcher || {};

EventDispatcher = {

	eventPool : [],

	addEventListener : function( _event , _eventHandler ){
		var eventObject = { "event": _event, "eventHandler" : _eventHandler  }
		this.eventPool.push( eventObject );
	},
	removeEventListener : function( _event, _eventHandler ){
		var eventObject = { "event": _event, "eventHandler" : _eventHandler  }
		var i = -1;
		while( i++ < this.eventPool.length-1 ){
			if ( _eventHandler === this.eventPool[i].eventHandler ){
				this.eventPool.splice( i, 1 );
			}
		}
	},
	dispatchEvent : function( _event , _payload ){

		var i = -1;
		while( i++ < this.eventPool.length-1 ){
			if ( _event === this.eventPool[i].event ){
				this.eventPool[i].eventHandler.call( undefined, _payload );
			}
		}
	},
	getEvents : function(){
		return this.eventPool;
	}
};