import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ImageBackground,
} from "react-native";
import { Button, IconButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { images } from "../images";
import { useDispatch, useSelector } from "react-redux";
import { addToFav, clearAll } from "../redux/slices/favoriteImageSlice";
import { useNavigation } from "@react-navigation/native";

const AddImages = () => {
  const favoriteImages = useSelector((state) => state.fav.favList);
  const [modalVisible, setModalVisible] = useState(true);
  //   const [imageData, setImageData] = useState(
  //     favoriteImages.length ? favoriteImages : images
  //   );
  // tempImageDataList is used for filtering data on categories
  const [tempImageDataList, setTempImageDataList] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [buttonFlag, setButtonFlag] = useState(true);
  const [currentImageDetails, setCurrentImageDetails] = useState(
    imageData[imageIndex]
  );
  const [selectedCategory, setSelectedCategory] = useState();
  const [tempFavList, setTempFavList] = useState([]);
  const category = ["fruits", "animals", "birds"];

  const dispatch = useDispatch();
  const navigation = useNavigation();

  function checkButtonFlag(imageDetails) {
    var bool = true;
    console.log("imageDetails", imageDetails, tempFavList);
    tempFavList.forEach((item) => {
      if (imageDetails?.id === item?.id) {
        console.log("naaaa");
        bool = false;
        return bool;
      }
    });
    return bool;
  }

  function handleLeft() {
    var bool: Boolean;
    if (imageIndex != 0) {
      let temp = imageIndex - 1;
      setImageIndex(temp);
      setCurrentImageDetails(imageData[temp]);
      bool = checkButtonFlag(imageData[temp]);
      setButtonFlag(bool);
    } else {
      console.log("reached left end");
      bool = checkButtonFlag(imageData[0]);
      setButtonFlag(bool);
    }
  }

  function handleRight() {
    var bool;
    if (imageIndex != imageData.length - 1) {
      let temp = imageIndex + 1;
      setImageIndex(temp);
      setCurrentImageDetails(imageData[temp]);
      bool = checkButtonFlag(imageData[temp]);
      setButtonFlag(bool);
    } else {
      console.log("reached right end");
      bool = checkButtonFlag(imageData[imageData.length - 1]);
      setButtonFlag(bool);
    }
  }

  function handleAddToFav() {
    let temp = tempFavList;
    temp.push(currentImageDetails);
    console.log("temp", temp);
    setTempFavList(temp);
    setButtonFlag(false);
  }

  function handleRemoveFromFav() {
    let temp = [];
    tempFavList.forEach((element) => {
      console.log("see", element.id, currentImageDetails.id);
      if (element.id === currentImageDetails.id) {
        return;
      } else {
        temp.push(element);
      }
    });
    console.log("temp", temp);
    setTempFavList(temp);
    setButtonFlag(true);
  }

  function handleDone() {
    dispatch(addToFav(tempFavList));
    console.log("at last", tempFavList);
    navigation.goBack();
  }

  function setImageList() {
    var temp = [];
    if (favoriteImages.length > 0) {
      images.forEach((element, index) => {
        favoriteImages.forEach((item) => {
          if (element.id !== item.id) {
            temp.push(element);
            setImageData(temp);
            setTempImageDataList(temp);
          }
        });
      });
      console.log("temp", temp);
    } else {
      temp = images;
      setImageData(temp);
      setTempImageDataList(temp);
      console.log("temp", temp);
    }
  }

  function filterData(category) {
    var temp = [];
    var bool;

    console.log("category", category);
    tempImageDataList.forEach((element) => {
      console.log("element", element.category);
      if (element.category === category) {
        console.log("inside");
        temp.push(element);
      }
    });
    console.log("temp", temp);
    setImageData(temp);
    setCurrentImageDetails(temp[0]);
    bool = checkButtonFlag(temp[0]);
    setButtonFlag(bool);
  }
  useEffect(() => {
    setImageList();
  }, []);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                flex: 1,
                borderColor: "black",
                borderWidth: 0.3,
                margin: 10,
                borderRadius: 10,
              }}
            >
              <Picker
                style={{ margin: 5 }}
                selectedValue={selectedCategory}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedCategory(itemValue);
                  filterData(itemValue);
                }}
              >
                <Picker.Item
                  label="Please Select Category...."
                  value={"Please Select Category"}
                />
                {category.map((item) => (
                  <Picker.Item label={item} value={item} />
                ))}
              </Picker>
            </View>
            <View style={{ flex: 5, justifyContent: "center" }}>
              <ImageBackground
                source={{ uri: `${currentImageDetails?.url}` }}
                style={{ width: "100%", height: "100%" }}
              />
              <IconButton
                icon="chevron-left-circle"
                size={65}
                style={{ position: "absolute", alignSelf: "flex-start" }}
                onPress={handleLeft}
              />
              <IconButton
                icon="chevron-right-circle"
                size={65}
                style={{ position: "absolute", alignSelf: "flex-end" }}
                onPress={handleRight}
              />
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1, borderRadius: 0 }}>
                {buttonFlag ? (
                  <Button
                    style={{
                      flex: 1,
                      borderRadius: 10,
                      margin: 10,
                      backgroundColor: "blue",
                    }}
                    mode="contained"
                    onPress={handleAddToFav}
                  >
                    Add To Fav
                  </Button>
                ) : (
                  <Button
                    style={{
                      flex: 1,
                      borderRadius: 10,
                      margin: 10,
                      backgroundColor: "blue",
                    }}
                    mode="contained"
                    onPress={handleRemoveFromFav}
                  >
                    Remove from Fav
                  </Button>
                )}
              </View>
              <View style={{ flex: 1, borderRadius: 0 }}>
                <Button
                  style={{
                    flex: 1,
                    borderRadius: 10,
                    margin: 10,
                    backgroundColor: "blue",
                  }}
                  mode="contained"
                  onPress={handleDone}
                >
                  Done
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#008b8b",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    marginVertical: 200,
    marginHorizontal: 30,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default AddImages;
