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
        backgroundColor: '#ffffff',
        marginTop:64,
        padding:15,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8,
        fontFamily:'Helvetica Neue',
        color:'#555555'

    },
    detail: {
        fontSize: 14,
        marginBottom: 8,
        fontFamily:'Helvetica Neue',
        color:'#808080'
    },
});

var EmployerDetail = React.createClass({
    render: function() {
        var employer = this.props.employer;
        return (
            <View style={styles.employerDetail}>
                <Text style={styles.detail}>{employer.description}</Text>
            </View>

        );
    },
  
});


module.exports = EmployerDetail;