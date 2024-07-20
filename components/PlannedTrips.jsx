import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const PlannedTrips = ({ plan }) => {
    // If plan is not provided, show a loading message
    if (!plan) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    // Render the planned trips
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={{marginBottom:10,fontFamily:'outfit-bold',fontSize:20}}>🛣️Daily Plans</Text>
            {Object.keys(plan.daily_plan).map((dayKey, index) => (
                <View key={index} style={styles.dayContainer}>
                    <Text style={styles.dayHeading}>Day {index + 1}</Text>
                    
                    <View style={styles.activitiesContainer}>
                        <ActivitySection title="Morning" activities={plan.daily_plan[dayKey].morning} />
                        <ActivitySection title="Afternoon" activities={plan.daily_plan[dayKey].afternoon} />
                        <ActivitySection title="Evening" activities={plan.daily_plan[dayKey].evening} />
                        {plan.daily_plan[dayKey].night && (
                            <ActivitySection title="Night" activities={plan.daily_plan[dayKey].night} />
                        )}
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const ActivitySection = ({ title, activities }) => {
    return (
        <View style={styles.activitySection}>
            <Text style={styles.activityTitle}>{title}</Text>
            {activities.map((activity, index) => (
                <TouchableOpacity key={index} style={styles.activityItem}>
                    <Text style={styles.activityTime}>{activity.time}</Text>
                    <Text style={styles.activityDesc}>{activity.activity}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 5,
        backgroundColor: 'transparent',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
    },
    dayContainer: {
        backgroundColor: '#fff',
        marginBottom: 20,
        borderRadius: 10,
        elevation: 3,
        overflow: 'hidden', // Ensure rounded corners clip shadow correctly
    },
    dayHeading: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: 'black', // Green background for day heading
        color: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    activitiesContainer: {
        padding: 15,
    },
    activitySection: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    activityTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    activityItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    activityTime: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    activityDesc: {
        fontSize: 16,
        color: '#666',
    },
});

export default PlannedTrips;
