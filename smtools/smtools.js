function buildplayerattributes(pos1, pos2, pos3, pos4, ovr, age){
	let attr=setinitialatttributes(ovr);
	attr = gkadjustment(pos1, pos2, pos3, pos4, ovr, attr);
	attr = getattributesforpos(pos4, ovr, attr);
	attr = getattributesforpos(pos3, ovr, attr);
	attr = getattributesforpos(pos2, ovr, attr);
	attr = getattributesforpos(pos1, ovr, attr);

    attr = rectifyovr(pos1, attr, ovr);
    
    attr.overallrating=ovr;
    attr.potential= getpotential(age, ovr, pos1, pos2, pos3, pos4);

    attr.preferredposition1=pos1 ?? 14;
    attr.preferredposition2=pos2 ?? -1;
    attr.preferredposition3=pos3 ?? -1;
    attr.preferredposition4=pos4 ?? -1;

	return attr;
}

function buildplayerappearances(gender, nationname){

    let nation = nations().find(n=>n.nation==nationname);
    if(!nation){
        nation= nations()[145];
    }

	let skintone = getskintone(nation);
    let haircolor=gethaircolor(skintone);
    let facialhaircolor=getfacialhaircolor(haircolor);

	let appearance = {
		skintonecode: skintone || 5,
		haircolorcode: haircolor,
		facialhaircolorcode: facialhaircolor,
        facialhairtypecode: getfacialhairtype(gender),
		headtypecode: getheadtypecode(nation),
		hairtypecode: gethairtypecode(skintone),
		shoe: getshoe(),
		gkglove: getgkglove(),
        skintypecode: 0,
        sideburnscode: 0,
        eyebrowcode: geteyebrowcode()||0,
        eyecolorcode: geteyecolorcode(skintone)||8,
        gender: gender || 0
	}

	return appearance;
}

function builddemographics(height, weight, birthdate, foot, weakfoot, ovr){
    
   let demo={
        height: height || 180,
        weight: weight || 75,
        birthdate: getfifabirthdateval(birthdate) || 141428,
        internationalrep: getinternationalrep(ovr) || 1 ,
        preferredfoot: getfoot(foot) || 1,
        personality: randbetween(1,5) || 3,
        weakfootabilitytypecode: getweakfoot(weakfoot) || 2
    };

    return demo;

}

function parsetemplateplayer(player){//pass player as an obj
    player.finovr=getovrfromtemplate(player.ovr,player.transfervalue) || 60; 
    player.age=calculateage(player.birthdate, "2023-09-27"); 

    player.pos1=getpositionid(player.pos1, true);
    player.pos2=getpositionid(player.pos2, false);
    player.pos3=getpositionid(player.pos3, false);
    player.pos4=getpositionid(player.pos4, false);

    return player;
}