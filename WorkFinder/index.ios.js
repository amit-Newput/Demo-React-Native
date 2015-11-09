/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';

import Button from 'apsl-react-native-button'

var React = require('react-native');
var EmployerDetail = require('./EmployerDetail');


var {
    AppRegistry,
    ListView,
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableHighlight,
    TouchableNativeFeedback,
    NavigatorIOS,
    AlertIOS,
    ActivityIndicatorIOS,

} = React;

var REQUEST_URL = 'http://dispatcher.com/employers/search';

var WorkFinder = React.createClass({
  render: function() {
    return (
    <NavigatorIOS
        style={styles.container}
        initialRoute={{
        title: 'Employers',
        component: EmployerList,
        backButtonTitle:'Back',
      }}
    />
    );
  },
});

var EmployerList = React.createClass({
    getInitialState: function() {
        return {
          dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          }),
          loaded: false,
        };
      },

    componentDidMount: function() {
        this.fetchData();
    },
    
    fetchData: function() {
        fetch(REQUEST_URL)
          .then((response) => response.json())
          .then((responseData) => {
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(responseData),
              loaded: true,
            });
          })
          .done();
    },
 
    render: function() {
        if (!this.state.loaded) {
          return this.renderLoadingView();
        }
        return (
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderEmployerRow}
            style={styles.listView}
          />

        );
  },

    renderLoadingView: function() {
        return (
            <ActivityIndicatorIOS
            animating={this.state.animating}
            style={styles.spinner}
            size="large"
          />

        );
    },

    renderEmployerRow: function(employer) {
       var TouchableElement = TouchableHighlight;
        return (
            <TouchableElement activeOpacity={0.9}
                onPress={() => this.employerRowClicked(employer)}>
                <View>
                    <View style={styles.employerRow}>
                        <View style={styles.leftContainer}>
                            <Text style={styles.title}>{employer.name}</Text>
                        </View>
                        <Button
                            onPress={() => this.payInfoButtonClicked(employer)}
                            style={styles.button} textStyle={styles.buttonText}>
                            Pay Info
                        </Button>
                    </View>
                    <View style={styles.separator} />
                </View>
          </TouchableElement>
        );
      },
      
    employerRowClicked(employer){
        this.props.navigator.push({
            title: employer.name,
            component: EmployerDetail,
            passProps: {employer: employer},

        });
    },
      
    payInfoButtonClicked(employer){
          var alertTitle = employer.name;
          var payInfo = null;
          for(key in employer.info) { 
            var item = employer.info[key];
            if(item.title == 'Pay'){
                payInfo = item.body;
                break;
            }
          }
          if(!payInfo){
            payInfo = 'No Payment Information.';
          }

          AlertIOS.alert(
          alertTitle,
          payInfo);
    },
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    spinner:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',

      },
      employerRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingLeft:15,
        paddingRight:15,
        paddingTop:10,
        paddingBottom:10,
      },
      leftContainer: {
        flex: 3,
        flexDirection: 'column',
      },
      title: {
        fontSize: 14,
        fontWeight:'bold',
        color:'#555555',
        fontFamily:'Helvetica Neue'
      },
      listView: {
        backgroundColor: '#ffffff',
        marginTop:64,
      },
      separator: {
        height: 1,
        backgroundColor: '#aaaaaa',
      },
      button:{
        backgroundColor: '#0077c7',
        borderWidth: 0,
        borderRadius:5,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom:0,
        height:40,

      },
      buttonText:{
        color:'#ffffff',
        fontSize:14,
        fontWeight:'bold',
        fontFamily:'Helvetica Neue'
      },
});

AppRegistry.registerComponent('WorkFinder', () => WorkFinder);
