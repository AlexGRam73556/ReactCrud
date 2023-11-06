import './Crud.css'
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import edit_icon from '../Assets/edit.png'
import delete_icon from '../Assets/delete.png'
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

//DB estatica
const data = [
  { id: 1, nombre: "Alejandro", apellidoP: "Ramirez" , apellidoM: "Gaytan", edad: "22"},
  { id: 2, nombre: "Jose", apellidoP: "Diaz" , apellidoM: "Rubio", edad: "23"},
  { id: 3, nombre: "Demian", apellidoP: "Orozco" , apellidoM: "Rodriguez", edad: "21"},
  { id: 4, nombre: "Ana", apellidoP: "Perez" , apellidoM: "Pina", edad: "20"},
  { id: 5, nombre: "Elena", apellidoP: "Fuentes" , apellidoM: "Gonzalez", edad: "32"},
  { id: 6, nombre: "Sergio", apellidoP: "Duran" , apellidoM: "Gonzalez", edad: "32"},
];

//Se van a mostrar los campos vacios para el CRUD
class CrudApp extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      nombre: "",
      apellidoP: "",
      apellidoM: "",
      edad: "",
    },
    error: "",
  };

  //Se muestra el modal de Update
  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  //Se cierra el modal de Update
  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  //Se muestra el modal de Create
  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  //Se cierra el modal de Create
  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  //Agarra los datos del array para el update y los coloca en los campos respectivos
  editar = (dato) => {
    // Validar que todos los campos estén completos
    const { nombre, apellidoP, apellidoM, edad } = this.state.form;
    if (!nombre || !apellidoP || !apellidoM || !edad) {
      this.setState({ error: "Debes completar todos los campos" });
      return;
    }
  
    // Realizar la edición solo si los campos están completos
    let contador = 0; // Cambio const por let
    const arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id === registro.id) {
        arreglo[contador].nombre = dato.nombre;
        arreglo[contador].apellidoP = dato.apellidoP;
        arreglo[contador].apellidoM = dato.apellidoM;
        arreglo[contador].edad = dato.edad;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false, error: "" });
  
    // Limpiar los campos después de la edición
    this.setState({
      form: {
        id: "",
        nombre: "",
        apellidoP: "",
        apellidoM: "",
        edad: "",
      },
    });
  };
  

  //Elimina los datos del array
  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  //Crea los datos dentro del array
  insertar = () => {
    // Validar que todos los campos estén completos
    const { nombre, apellidoP, apellidoM, edad } = this.state.form;
    if (!nombre || !apellidoP || !apellidoM || !edad) {
      this.setState({ error: "Debes completar todos los campos" });
      return;
    }
  
    // Continuar con la inserción solo si los campos están completos
    const valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    const lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista, error: "" });
  
    // Limpiar los campos después de la inserción
    this.setState({
      form: {
        id: "",
        nombre: "",
        apellidoP: "",
        apellidoM: "",
        edad: "",
      },
    });
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
          <h2 className='header'>Tabla de Usuarios</h2>
          <div className='table-container'>
          <Table >
            <thead>
              <tr>
                <th >ID</th>
                <th >Nombre</th>
                <th >Apellido Paterno</th>
                <th >Apellido Materno</th>
                <th >Edad</th>
                <th >Acción</th>
              </tr>
            </thead>

            <tbody> {/* Mustra los datos del array en la tabla */}
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td >{dato.id}</td>
                  <td >{dato.nombre}</td>
                  <td >{dato.apellidoP}</td>
                  <td >{dato.apellidoM}</td>
                  <td >{dato.edad}</td>
                  <td >
                    <Button color='primary' onClick={() => this.mostrarModalActualizar(dato)}><img src={edit_icon} alt=''></img></Button>{"  "}
                    <Button color='danger' onClick={()=> this.eliminar(dato)}><img src={delete_icon} alt=''></img></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
          
          <div className='center'>
          <button className="submite" onClick={()=>this.mostrarModalInsertar()}>Crear</button>
          </div>
          {this.state.error && (
            <div className="alert alert-danger">{this.state.error}</div>
          )}
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Apellido Paterno: 
              </label>
              <input
                className="form-control"
                name="apellidoP"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.apellidoP}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Apellido Materno: 
              </label>
              <input
                className="form-control"
                name="apellidoM"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.apellidoM}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Edad: 
              </label>
              <input
                className="form-control"
                name="edad"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.edad}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar nombre</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Apellido Paterno: 
              </label>
              <input
                className="form-control"
                name="apellidoP"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Apellido Materno: 
              </label>
              <input
                className="form-control"
                name="apellidoM"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Edad: 
              </label>
              <input
                className="form-control"
                name="edad"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default CrudApp;
