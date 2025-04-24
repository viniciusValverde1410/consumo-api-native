import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import axios  from "axios";

import FilmCard from "../components/FilmCard";
import SkeletonCard from "../components/SkeletonCard";

export default function Home() {
    // Ceria um estado chamado Films para guardar a lista de filmes
    const [films, setFilms] = useState([]);
    // Criar um estado chamado loading para controlar o carregamento
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            axios
                .get("https://ghibliapi.vercel.app/films")
                .then((res) => setFilms(res.data))
                .catch((err) => console.log(err))
                .finally(() => setLoading(false));
        }, 5000);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Filmes do Studio Ghibli 🎥📽🎬</Text>

            {loading ? (
                <FlatList
                    data={[1, 2, 3, 4, 5]}
                    keyExtractor={(item) => item.toString()}
                    renderItem={() => <SkeletonCard />}
                    contentContainerStyle={styles.list}
                />
            ) : (
                <FlatList
                    data={films}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <FilmCard film={item} />}
                    contentContainerStyle={styles.list}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        marginVertical: 20,
    },
    list: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
});
