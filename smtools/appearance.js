function getskintone(nation){
  
    let rand = randbetween(0,100);
    let tone = 3;
    
    let lightthresh = nation.lt;
    let medthresh = lightthresh + nation.md;
    let darkthresh = medthresh + nation.dk;

    //console.log("nation for skintone", nation);
    //console.log("threshs", lightthresh, medthresh, darkthresh);
    //console.log("the rand value", rand);

    if(rand<lightthresh){tone=randbetween(1,3)} 
    else if (rand<medthresh){tone = randbetween(3,7)}
    else if (rand<darkthresh){tone = randbetween(7,10)}
    
    //console.log("selected tone", 3);
    return tone || 3;

  }
  
  function gethaircolor(skintone){

    // 0 -> Black
    // 1 -> Blonde
    // 2 -> Ash Blonde
    // 3 -> Dark Brown
    // 4 -> Platinum Blonde
    // 5 -> Light Brown
    // 6 -> Brown
    // 7 -> Red
    // 8 -> White
    // 9 -> Gray
    // 10 -> Green
    // 11 -> Electric Blue

    let tonearray=[0,6];

    switch(skintone){
      case 0:
      case 1:
      case 2:
        tonearray = [0,1,1,3,3,3,5,5,5,6,6,6,6,0,1,1,3,3,3,5,5,5,6,6,6,6,0,1,1,3,3,3,5,5,5,6,6,6,6,7];
      break;
      case 3: 
      case 4:
      case 5:
      case 6:
        tonearray = [0,3,6];
      break;
    }
    //console.log(tonearray);
    let haircolor = tonearray[randbetween(0,tonearray.length-1)] || 0;    
    //console.log("skintone", skintone, "Haircolor", haircolor);

    return haircolor;

  }
  
  function getfacialhairtype(gender){
      if(gender==2||randbetween(1,100)<85){
        return 0
    }else{
      let facialhairarray=[3,5,8,9,11,12,14,15,17,19,20];
      return facialhairarray[randbetween(0,facialhairarray.length-1)];
    }
  }
  
  function getheadtypecode(nation){
    
    if(nation.asian==1){
      let asianheadcodes = [500,501,502,503,504,505,506,507,508,509,510,511,512,513,514,515,516,517,518,519,520,521,522,525,526,527,528,529,530,531,532,533,534,535,536,537,538,539,540,541,542,543,544,545,546,547,548,549,550,551,552,553,554,555,556,557,558,559,560,561,562,563,565,566,567,600,601,602];
        return asianheadcodes[randbetween(0,asianheadcodes.length-1)];
    }else{
      let nonasianheadcodes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,68,69,1000,1001,1002,1003,1004,1005,1006,1007,1008,1009,1010,1011,1012,1013,1014,1015,1016,1019,1021,1023,1024,1028,1029,1030,1031,1033,1035,1036,1037,1038,1039,1040,1041,1042,1043,1044,1045,1049,1050,1500,1501,1502,1503,1505,1506,1507,1508,1509,1510,1511,1512,1514,1515,1516,1517,1518,1519,1520,1521,1522,1523,1526,1528,1529,1530,1531,1532,1533,1534,1535,1536,1537,1538,1539,1540,1541,1542,1543,1545,1546,1547,1548,1549,1550,1551,1552,1553,1554,1555,1556,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2012,2013,2014,2015,2016,2017,2019,2020,2021,2022,2027,2030,2031,2032,2500,2500,2501,2501,2502,2502,2503,2503,2504,2504,2505,2505,2506,2506,2507,2507,2508,2508,2510,2510,2511,2511,2512,2512,2515,2515,2516,2516,2517,2517,2518,2518,2519,2519,2520,2520,2521,2521,2522,2522,603,603,604,604,605,605,606,606,607,607,608,608,3000,3001,3002,3003,3004,3005,3500,3501,3502,3503,3504,3505,3506,3507,3508,3509,3510,3512,3513,3514,3515,3516,3517,3518,3519,4000,4001,4002,4003,4004,4005,4006,4007,4008,4009,4010,4011,4012,4013,4014,4015,4016,4017,4018,4019,4020,4021,4022,4024,4500,4501,4502,4525,5000,5001,5002,5003]
        return nonasianheadcodes[randbetween(0,nonasianheadcodes.length-1)];
    }
    
    return headid;
  }
  
  function gethairtypecode(skintone){

      let common=[18, 65,77,93,184];
      let rare=[2,16,17,24,28,54,57,58,60,63,64,82,85,115,123,131,133,145,169,179,220,283,284,298,554,902];

      if(skintone>=7){
        rare=[...rare, ...[4,5,27,71,110,664]];
      }
    
      let hairtypecode=common[randbetween(0,common.length-1)]||18;
      
      if(randbetween(1,100)>95){
        console.log("get rare hairtypecode");
        hairtypecode=rare[randbetween(0,rare.length-1)]||18;
      }
      
      return hairtypecode;
    }

  function geteyebrowcode(){
    let eyebrowcode = randbetween(0,6);
    if(eyebrowcode==2){eyebrowcode=0;}
    return eyebrowcode;
  }

  function geteyecolorcode(skintone){
    let eyecolorcode = 8;
    if(skintone<5){eyecolorcode=randbetween(0,9);}
    return eyecolorcode;
  }

  function getshoe(){
    let arr = [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,95,96,97,98,99,100,101,102,103,104,105,106,107,108,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315];
    let shoe = arr[randbetween(0,arr.length-1)];
    return shoe;
  }
  
  function getgkglove(){
    let arr = [73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,100,102,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,126];
    let glove = arr[randbetween(0,arr.length-1)];
    return glove;
  }

  function getfacialhaircolor(haircolor){
    
    switch(haircolor){
      case 0: return 0;
      case 1: return 5;
      case 2: return 5;
      case 3: return 6;
      case 4: return 5;
      case 5: return 6;
      case 6: return 6;
      case 7: return 7;
      case 8: return 5;
      case 9: return 5;
      case 10: return 6;
      case 11: return 6;

    }

  }