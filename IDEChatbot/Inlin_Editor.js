const functions = require('firebase-functions');
const admin=require('firebase-admin');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

admin.initializeApp({
	credential: admin.credential.applicationDefault(),
	databaseURL: 'ws://idechatbot-xsrbmv.firebaseio.com/'
});
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  function handleSTL(agent){
  	const a=agent.parameters.STL;
    b=agent.parameters.function;
    if(b=="component"){b='component';}
    else{b='idea';}
    return admin.database().ref().once("value").then((snapshot)=>{
    	var STLInfo=snapshot.child('answer/'+a+'/'+b).val();
      	agent.add(STLInfo);});
  }
  
  function handlestaticallocation(agent){
  	const a=agent.parameters.staticallocation;
    return admin.database().ref().once("value").then((snapshot)=>{
    	var allocationInfo=snapshot.child('answer/'+a+'/idea').val();
      	agent.add(allocationInfo);});
  }
  
  function handleabstraction(agent){
  	a=agent.parameters.abstraction;
    b=agent.parameters.use;
    if(b!="use"){b='idea';}
    return admin.database().ref().once("value").then((snapshot)=>{
    	var  abstractionInfo=snapshot.child('answer/'+a+'/'+b).val();
      	agent.add(abstractionInfo);});
  }
  
  function handlevector(agent){
  	const a=agent.parameters.vector;
    b=agent.parameters.function;
    
    if(b=="function"){b='function';}
    else{b='idea';}
    return admin.database().ref().once("value").then((snapshot)=>{
    	var  vectorInfo=snapshot.child('answer/'+a+'/'+b).val();
      	agent.add(vectorInfo); });
  }
  
  function handleiterator(agent){
  	const a=agent.parameters.iterator;
    return admin.database().ref().once("value").then((snapshot)=>{
    	var iteratorInfo=snapshot.child('answer/'+a+'/idea').val();
      	agent.add(iteratorInfo);});
  }
  
  function handletemplate(agent){
  	const a=agent.parameters.template;
    return admin.database().ref().once("value").then((snapshot)=>{
    	var templateInfo=snapshot.child('answer/'+a+'/idea').val();
      	agent.add(templateInfo);});
  }
  
  function handlegeneric(agent){
  	const a=agent.parameters.generic;
    return admin.database().ref().once("value").then((snapshot)=>{
    	var ideaInfo=snapshot.child('answer/'+a+'/idea').val();
      	var codeInfo=snapshot.child('answer/'+a+'/code').val();
      	agent.add(ideaInfo+"이고 "+codeInfo+"를 추가하면 된다."); });
  }
  
  function handlemap(agent){
  	const a=agent.parameters.map;
     b=agent.parameters.function;
    if(b=="function"){b='function';} else{b='idea';}
    return admin.database().ref().once("value").then((snapshot)=>{
    	var  mapInfo=snapshot.child('answer/'+a+'/'+b).val();
      	agent.add(mapInfo); });
  }
  
  function handlestream(agent){
  	a=agent.parameters.stream;
    b=agent.parameters.iostream;
    return admin.database().ref().once("value").then((snapshot)=>{
    	var streamInfo=snapshot.child('answer/'+a+'/idea').val();
      	var iostreamInfo=snapshot.child('answer/stream/'+b).val();
      	if(a=="stream") agent.add(streamInfo); 
      	else agent.add(iostreamInfo);});
  }
  
  function handleupcasting(agent){
  	const a=agent.parameters.upcasting;
    return admin.database().ref().once("value").then((snapshot)=>{
    	var ideaInfo=snapshot.child('answer/'+a+'/idea').val();
      	agent.add(ideaInfo); });
  }

  function handleoverriding(agent){
	const a=agent.parameters.overriding;
    return admin.database().ref().once("value").then((snapshot)=>{
    	var ideaInfo=snapshot.child('answer/'+a+'/idea').val();
      	agent.add(ideaInfo); });
  }

  function handlememoryallocation(agent){
	const a=agent.parameters.memoryallocation;
    const b=agent.parameters.careful;
    return admin.database().ref().once("value").then((snapshot)=>{
    	var ideaInfo=snapshot.child('answer/'+a+'/'+b).val();
      	agent.add(ideaInfo); });
  }
  
  function handlemalloc(agent){
  	const a=agent.parameters.malloc;
    const b=agent.parameters.need;
    return admin.database().ref().once("value").then((snapshot)=>{
    	var ideaInfo=snapshot.child('answer/'+a+'/'+b).val();
      	agent.add(ideaInfo); });
  }
  
  function handlereuse(agent){
  	const a=agent.parameters.reuse;
    const b=agent.parameters.how;
    const c=agent.parameters.mean;
    return admin.database().ref().once("value").then((snapshot)=>{
    	var howInfo=snapshot.child('answer/'+a+'/'+b).val();
      	var meanInfo=snapshot.child('answer/'+a+'/'+c).val();
      	if(b=="how") agent.add(howInfo); else agent.add(meanInfo); });
  }
  
  function handledynamicbinding(agent){
  	const a=agent.parameters.dynamicbinding;
    return admin.database().ref().once("value").then((snapshot)=>{
    	var ideaInfo=snapshot.child('answer/'+a+'/idea').val();
      	agent.add(ideaInfo); });
  }
  
   function handleoperatingoverloading(agent){
    const a=agent.parameters.operatingoverloading;
    const b=agent.parameters.exam;
    const c=agent.parameters.function;
    const d=agent.parameters.postfixoperator;
    const e=agent.parameters.prefixoperator;
    const f=agent.parameters.idea;
    return admin.database().ref().once("value").then((snapshot)=>{
      var ideaInfo=snapshot.child('answer/'+a+'/idea').val();
      var examInfo=snapshot.child('answer/'+a+'/exam').val();
      var postfixInfo=snapshot.child('answer/operatingoverloading/'+d).val();
      var prefixInfo=snapshot.child('answer/operatingoverloading/'+e).val();
      if(b=="exam")agent.add(examInfo);
      else if(d=="postfixoperator")
      {agent.add(postfixInfo);}
      else if(e=="prefixoperator")
      {agent.add(prefixInfo);}
      else{agent.add(ideaInfo);}
   });
  }
  
   function handlevariable(agent){
    const a=agent.parameters.Variable;
    const b=agent.parameters.type;
    const c=agent.parameters.default;
    const d=agent.parameters.advantage;
    const e=agent.parameters.exam;
    const f=agent.parameters.idea;
    return admin.database().ref().once("value").then((snapshot)=>{
      if(c=="default")
      {
        var ideaInfo=snapshot.child('answer/Variable/'+c+'/idea').val();
        var examInfo=snapshot.child('answer/Variable/'+c+'/exam').val();
        var adInfo=snapshot.child('answer/Variable/'+c+'/advantage').val();
        if(f=="idea") 
        { agent.add(ideaInfo);}
         else if(e=="exam")
         {agent.add(examInfo);}
        else{agent.add(adInfo);}
      }
      else if(b=="type")
      {
        var variabletype=snapshot.child('answer/'+a+'/type').val();
        agent.add(variabletype);
      }});
  }
  
  function handlethis(agent){
  	const a=agent.parameters.this;
    const b=agent.parameters.where;
    const c=agent.parameters.need;
    const d=agent.parameters.handling;
    return admin.database().ref().once("value").then((snapshot)=>{
    	var ideaInfo=snapshot.child('answer/'+a+'/idea').val();
      	var whereInfo=snapshot.child('answer/'+a+'/'+b).val();
      	var needInfo=snapshot.child('answer/'+a+'/'+c).val();
      	var handlingInfo=snapshot.child('answer/'+a+'/'+d).val();
      	if(b=="where") agent.add(whereInfo);
      	else if(c=="need") agent.add(needInfo);
      	else if(d=="handling") agent.add(handlingInfo);
      	else agent.add(ideaInfo);
    });
  }
  
  function handlestring(agent){
    const a=agent.parameters.string;
    const b=agent.parameters.function;
    const c=agent.parameters.header;
    const d=agent.paramerters.gap;
    return admin.database().ref().once("value").then((snapshot)=>{
      var functionInfo=snapshot.child('answer/string/function').val();
      var headerInfo=snapshot.child('answer/string/header').val();
      var gapInfo=snapshot.child('answer/string/gap').val();
      if(b=="function")agent.add(functionInfo);
      else if(d=="gap")
      {
        agent.add(gapInfo);
      }
      else agent.add(headerInfo);});
  }
  
  function handledestructor(agent){
    const a=agent.parameters.destructor;
    const b=agent.parameters.call;
    const c=agent.parameters.dynamicobject;
    const d=agent.parameters.idea;
    const e=agent.parameters.order;
    const f=agent.parameters.redundancy;
    const g=agent.parameters.return;
    const h=agent.parameters.when;
    const i=agent.parameters.why;
     const j=agent.parameters.how;
    return admin.database().ref().once("value").then((snapshot)=>{
      var callInfo=snapshot.child('answer/'+a+'/'+b+'/'+j).val();
      var dynamicobjectInfo=snapshot.child('answer/destructor/'+c).val();
      var ideaInfo=snapshot.child('answer/'+a+'/'+d).val();
      var orderInfo=snapshot.child('answer/'+a+'/'+e).val();
      var redundancyInfo=snapshot.child('answer/'+a+'/'+f).val();
      var returnInfo=snapshot.child('answer/'+a+'/'+g).val();
      var whenInfo=snapshot.child('answer/'+a+'/'+h).val();
       var whyInfo=snapshot.child('answer/'+a+'/'+i).val();
      if(c=="dynamicobject")agent.add(dynamicobjectInfo);
      else if(e=="order")agent.add(orderInfo);
      else if(f=="redundancy")agent.add(redundancyInfo);
      else if(g=="return")agent.add(returnInfo);
      else if(h=="when")agent.add(whenInfo);
      else if(i=="why")agent.add(whyInfo);
      else if(j=="how")agent.add(callInfo);
      else agent.add(ideaInfo);
      });
  }
  
  function handlec(agent){
  	const a=agent.parameters.c;
    const b=agent.parameters.similar;
    return admin.database().ref().once("value").then((snapshot)=>{
    	var ideaInfo=snapshot.child('answer/c++/similar').val();
      	agent.add(ideaInfo); });
  }
  function handlearray(agent){
  	const a=agent.parameters.object;
    const b=agent.parameters.array;
    const c=agent.parameters.initialization;
    const d=agent.parameters.destructor;
    const e=agent.parameters.declare;
    const f=agent.parameters.relation;
    const g=agent.parameters.why;
    const h=agent.parameters.error;
    return admin.database().ref().once("value").then((snapshot)=>{
      	var destructInfo=snapshot.child('answer/array/destruct').val();
      	var relationInfo=snapshot.child('answer/array/object/constructor/relation').val();
      	var whyInfo=snapshot.child('answer/array/object/compileerror/why').val();
      	var declare=snapshot.child('answer/array/object/declare').val();
      	var initInfo=snapshot.child('answer/array/object/initialization/exam').val();
    	if(a=="object"){
        	if(g=="why") agent.add(whyInfo);
          	else if(f=="relation") agent.add(relationInfo);
          	else if(e=="declare") agent.add(declare);
          	else agent.add(initInfo);
        }
      else{
      	agent.add(destructInfo);
      }
    });
  }
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('STLIntent',handleSTL);
  intentMap.set('abstractionIntent',handleabstraction);
  intentMap.set('vectorIntent',handlevector);
  intentMap.set('iteratorIntent',handleiterator);
  intentMap.set('genericIntent',handlegeneric);
  intentMap.set('mapIntent',handlemap);
  intentMap.set('staticallocationIntent',handlestaticallocation);
  intentMap.set('streamIntent',handlestream);
  intentMap.set('templateIntent',handletemplate);
  intentMap.set('upcastingIntent',handleupcasting);
  intentMap.set('overridingIntent',handleoverriding);
  intentMap.set('memoryallocationIntent',handlememoryallocation);
  intentMap.set('mallocIntent',handlemalloc);
  intentMap.set('reuseIntent',handlereuse);
  intentMap.set('dynamicbindingIntent',handledynamicbinding);
  intentMap.set('operatingoverloadingIntent',handleoperatingoverloading);
  intentMap.set('variableIntent',handlevariable);
  intentMap.set('thisIntent',handlethis);
  intentMap.set('stringIntent',handlestring);
  intentMap.set('destructorIntent',handledestructor);
  intentMap.set('arrayIntent',handlearray);
  intentMap.set('c++Intent',handlec);
  agent.handleRequest(intentMap);
});
