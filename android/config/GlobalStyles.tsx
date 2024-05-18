import {StyleSheet} from 'react-native';

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666',
    fontWeight: 'bold',
  },
  selectionArea: {
    flex: 1,
    marginBottom: 20,
  },
  selectionText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  instructions: {
    fontSize: 16,
    color: '#666',
    textAlign: 'justify',
    marginBottom: 20,
  },
  wrapper: {
    flexDirection: 'row',
  },
  row: {
    height: 65,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '48%',
  },
  buttonBlue: {
    backgroundColor: '#007BFF',
  },
  buttonGreen: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default GlobalStyles;
