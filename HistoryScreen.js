import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, Text, StatusBar, StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomRatingBar from './CustomRatingBar'; //saje nak try rating jadi dalam bentuk star 
//Function Custom Rating Bar ni patut stay same even if data is the dummy one or from Firebase Firestore asalkan data structure is consistent

const JobHistoryScreen = () => {
  const [jobHistory, setJobHistory] = useState([]);

  useEffect(() => {
  // This is just dummy data for job history of the driver
  //structure data ade id,date,time,start & end destination.price,status and rating
  //This is where to implement the function to fetch the driver's job history from Firebase Firestore
  const dummyJobHistory = [
    {
        id: '1',
        date: '2023-12-10',
        time: '10:30 AM',
        startDestination: 'KTM, UKM',
        endDestination: 'Kolej Pendeta Zaaba, UKM',
        price: 'RM 10',
        status: 'Completed',
        rating: 4,
      },
      {
        id: '2',
        date: '2023-12-08',
        time: '09:00 AM',
        startDestination: 'Pusanika, UKM',
        endDestination: 'Kolej Keris Mas, UKM',
        price: 'RM 6',
        status: 'Completed',
        rating: 3,
      },
    // add more job history if needed
  ];

    //can fetch job history data from an API
    setJobHistory(dummyJobHistory);
  }, []);

  const navigation = useNavigation();

  const handleRatingSelection = (itemId, selectedRating) => {
    // to manage the rating selected in the data. 
    console.log(`Job ID: ${itemId}, Selected Rating: ${selectedRating}`);
  };

  //kat bawah ni ade line untuk include custom rating bar star dalam list data utk display
  const renderJobItem = ({ item }) => (
    <View style={styles.jobItem}>
      <View style={styles.jobHeader}>
        <View>
          <Text style={styles.date}>{item.date} at {item.time}</Text>
        </View>
        <View>
          <Text style={styles.status}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.destination}>{item.startDestination}</Text>
      <Text style={styles.destination}>{item.endDestination}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <CustomRatingBar rating={item.rating} onRatingPress={(selectedRating) => handleRatingSelection(item.id, selectedRating)} />
    </View>
  );
  
  const navigateToSearchBar = () => {
    navigation.navigate('SearchBar'); // This line is to navigate this page to suitable page (main menu.js rasanya) such as in this, SearchBar page when user push the back button
  };

  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Image source={require('../assets/images/background.png')} style={styles.backgroundImage} />
      {/* logo */}
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/justgoHeader.png')} // Update the path to your image
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>
      <FlatList
        data={jobHistory}
        renderItem={renderJobItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'maroon', // Set the background color of the header
    padding: 5,
    justifyContent: 'space-between',
    flexDirection: 'row', // Arrange children in a row
    marginTop: 40,
    borderBottomLeftRadius: 20, // Bottom left corner radius
    borderBottomRightRadius: 20, // Bottom right corner radius
  },
  logo: {
    width: 150, // Set the width of your logo
    height: 50, // Set the height of your logo
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 10,
  },
  logoImage: {
    width: 300,
    height: 300,
  },
  formContainer: {
    flex: 1,
    //justifyContent: 'top',
    alignItems: 'center',
    marginTop: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red', 
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  backText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  list: {
    width: '95%' //width of semi transparent box
  },
  jobItem: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background 
    borderRadius: 10, 
  },
  
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between', // To align date and status at the end of both side
    marginBottom: 10, //
  },

  date: {
    color: '#666',
    marginBottom: 1,
  },
});

export default JobHistoryScreen;