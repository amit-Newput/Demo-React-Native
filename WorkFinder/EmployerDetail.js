'use strict';

var React = require('react-native');
var {
  StyleSheet, 
  View,
  Text,
  Component,

} = React;

var styles = StyleSheet.create({
  employerDetail: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
    marginTop:64,
    padding:5,
    

  },
   title: {
   fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 8,
    
  },
   detail: {
    fontSize: 14,
    marginBottom: 8,
  },
});

var EmployerDetail = React.createClass({
 render: function() {
	var employer = this.props.employer;
    	return (
      		<View style={styles.employerDetail}>
        			<Text style={styles.title}>{employer.name}</Text>
          			<Text style={styles.detail}>{employer.description}</Text>
        	</View>
        

    );
  },
  
});


module.exports = EmployerDetail;