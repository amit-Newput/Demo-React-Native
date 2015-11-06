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
  Modal,
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
        selectedEmployer:null,
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
      modalVisible:false,
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
 _setModalVisible(visible) {
 
    this.setState({modalVisible: visible});
  },
  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

 var modalBackgroundStyle = {
      backgroundColor:  'rgba(0, 0, 0, 0.5)' ,
    };
    var innerContainerTransparentStyle =  {backgroundColor: '#fff', padding: 20};
      if(this.selectedEmployer){
      var modalTitle = this.selectedEmployer.name;
      var payInfo = null;
      for(key in this.selectedEmployer.info) { 
  		var item = this.selectedEmployer.info[key];
  		if(item.title == 'Pay'){
  			payInfo = item.body;
  			break;
   		}
   	}
   	if(!payInfo){
   		payInfo = 'No Payment Information.';
   	}
   	}
    return (
    <View>
        <Modal
          animated={true}
          transparent={true}
          visible={this.state.modalVisible}>
          <View style={[styles.modalContainer, modalBackgroundStyle]}>
            <View style={[styles.modalInnerContainer, innerContainerTransparentStyle]}>
                <Text style={styles.modalTitle}>{modalTitle}</Text>
              <Text style={styles.modalText}>{payInfo}</Text>
              <Button
                onPress={this._setModalVisible.bind(this, false)}
                style={styles.modalButton}>
                Close
              </Button>
            </View>
          </View>
        </Modal>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderEmployerRow}
        style={styles.listView}
      />
      </View>
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.spinner}>
        <ActivityIndicatorIOS
        animating={this.state.animating}
        style={[styles.centering, {height: 80}]}
        size="large"
      />
      </View>
    );
  },

  renderEmployerRow: function(employer) {
   var TouchableElement = TouchableHighlight;
    return (
    <TouchableElement activeOpacity={0.9}
           onPress={() => this._employerRowClicked(employer)}>
    <View>
      <View style={styles.employerRow}>
        <View style={styles.leftContainer}>
          <Text style={styles.title}>{employer.name}</Text>
        </View>
        <Button
                onPress={() => this._payInfoButtonClicked(employer)}
                style={styles.button} textStyle={styles.buttonText}>
                Pay Info
        </Button>
      </View>
    <View style={styles.separator} />
   </View>
      </TouchableElement>
    );
  },
  _employerRowClicked(employer){
  	this.props.navigator.push({
  		title: 'Description',
  		component: EmployerDetail,
  		passProps: {employer: employer},
  		
	});
  },
  _payInfoButtonClicked(employer){
  this.selectedEmployer = employer
  this._setModalVisible(true);
  },
});

var styles = StyleSheet.create({
container: {
    flex: 1
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
    backgroundColor: '#F5FCFF',
    padding:5
  },
  leftContainer: {
    flex: 3,
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
  },
  listView: {
    backgroundColor: '#F5FCFF',
    marginTop:64,
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
  },
  button:{
    backgroundColor: 'blue',
    borderWidth: 0,
    borderRadius:5,
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom:0
    
  },
  buttonText:{
  	color:'white',
  	fontSize:14,
  	fontWeight:'bold'
  },
   modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
  },
  modalInnerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle:{
 	fontSize: 24,
 	marginBottom:20,
  },
  modalText:{
 	fontSize: 18,
 	marginBottom:20,
  },
  modalButton:{
   width:100,
   alignSelf :'center'
  },
  
});

AppRegistry.registerComponent('WorkFinder', () => WorkFinder);
