/* eslint-disable react/prop-types */

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const MyDocument = ({ jobs }) => (
  <Document>
    <Page size="A4">
      <View style={styles.section}>
        <Text>Applied Jobs</Text>
        <View style={styles.jobList}>
          {jobs.map(job => (
            <View key={job._id} style={styles.jobItem}>
              <Text>Position : {job.jobTitle}</Text>
              <Text>Category : {job.jobCategory}</Text>
              <Text>Salary : {job.salaryRange}</Text>
              <Text>Hirer : {job.hirerName}</Text>
              <Text>Contact : {job.hirerEmail || job.hireremail}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  jobList: {
    marginTop: 20,
    padding: 10
  },
  jobItem: {
    marginTop: 20,
    border: '1 solid #000', 
    padding: 10
  }
});

export default MyDocument;

