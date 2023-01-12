import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useEffect, useState } from "react";

import { View, Text, FlatList, Image, ImageBackground } from "react-native";
import { FAB, IconButton, Appbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../images";
import {
  addToFav,
  clearAll,
  removeFromFav,
} from "../redux/slices/favoriteImageSlice";

const HomeScreen = () => {
  const imageData = images;

  const favoriteImages = useSelector((state) => state.fav.favList);

  const [favList, setFavList] = useState([]);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const navigation = useNavigation();

  function renderAppBar() {
    return (
      <Appbar.Header>
        <Appbar.Action icon="Home" />
        <Appbar.Content title="Home Screen" subtitle="Favorites" />
      </Appbar.Header>
    );
  }

  function handleDeleteFiles(id) {
    let temp = [];
    favList.filter((element) => {
      if (element.id != id) {
        temp.push(element);
      }
    });
    console.log("temp hre", temp);
    setFavList(temp);
    dispatch(removeFromFav(temp));
  }
  console.log("fav", favList);
  function fabComponent() {
    const [state, setState] = React.useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;

    return (
      <FAB.Group
        open={open}
        icon={open ? "arrow-up" : "plus"}
        color="black"
        actions={[
          {
            icon: "image",
            label: "Add Images",
            onPress: () => navigation.navigate("AddImages"),
          },
        ]}
        onStateChange={onStateChange}
      />
    );
  }

  const renderItem = (item) => {
    return (
      <View
        style={{
          margin: 5,
          width: 200,
          height: 240,
          backgroundColor: "green",
        }}
      >
        <Image
          source={{
            uri: item.item.url,
          }}
          style={{
            height: "100%",
            width: "100%",
            alignSelf: "center",
            borderRadius: 10,
            margin: 10,
          }}
        />
        <IconButton
          style={{
            position: "absolute",
          }}
          icon="delete"
          size={25}
          iconColor="red"
          onPress={() => handleDeleteFiles(item.item.id)}
        />
        <IconButton
          style={{
            position: "absolute",
            alignSelf: "flex-end",
          }}
          icon="eye"
          size={25}
          iconColor="black"
          onPress={() => dispatch(clearAll([]))}
        />
      </View>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <View style={{ flex: 1, marginVertical: 300 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          No Images in your Favroites.!
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Click the + icon to add images.
        </Text>
      </View>
    );
  };

  useEffect(() => {
    setFavList(favoriteImages);
  }, [isFocused]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#008b8b",
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <FlatList
          data={favList}
          extraData={favList}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={ListEmptyComponent}
        />
      </View>
      {fabComponent()}
    </View>
  );
};

export default HomeScreen;
