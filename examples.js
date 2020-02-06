let user = {
	name_first: "Iskra",
	name_last: "Marinova",
	get fullName () {
		return this.name_first + "," + this.name_last;
	
	}
}

let developer = {
	_proto_: user,
	isDeveloper: true
}

alert(developer.fullName);

////////////////////////////////////

http.get('url',params, function(err,data,res){
	
})

//////////////////////////////

interface Shape {
	name: string
}

let circle: Shape;
let rectangle= {name: "rectangle", corners: "yes"};

circle= rectangle; // true

rectangle = circle //false