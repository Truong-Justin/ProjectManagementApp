import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';

export function EditProjectManager() {
    const location = useLocation();
    const navigate = useNavigate();
    const { projectManager } = location.state;
    const {register, handleSubmit, formState: { errors },} = useForm();

    const onSubmit = async (data) => {
        await fetch(`https://projectsmanagementapi.azurewebsites.net/api/ProjectManager/UpdateProjectManager?projectManagerId=${projectManager.projectManagerId}&phone=${data.phone}&zip=${data.zip}&address=${data.address}`, {
            method: 'PUT'
        });
        navigate('/projectmanagersindex');
    }

    return (
        <div className="container d-none d-sm-none d-md-block">
            <div className="my-5 mx-auto">
                <div className="card shadow bg-light">
                    <div className="col-md-11 mx-auto">
                        <h1 className="mt-3 text-center text-decoration-underline">Edit Manager: {projectManager.firstName} {projectManager.lastName}</h1>
                        <hr />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="card px-5 py-5 mx-5 my-5 shadow">
                                <div className="row my-5">
                                    <div className="col">
                                        <div className="form-outline">
                                            <h4 className="text-decoration-underline">Address</h4>
                                            <input type="text" name="address" {...register("address")} defaultValue={projectManager.address} className="form-control shadow w-75"></input>
                                            {errors.address?.type === "required" && (
                                                <p className="errorMsg text-danger">An address is required.</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <h4 className="text-decoration-underline">Zip</h4>
                                            <input type="text" name="zip" {...register("zip")} defaultValue={projectManager.zip} className="form-control shadow w-75"></input>
                                            {errors.address?.type === "required" && (
                                                <p className="errorMsg text-danger">An zip code is required.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row my-5">
                                    <div className="col">
                                        <div className="form-outline">
                                            <h4 className="text-decoration-underline">Phone</h4>
                                            <input type="text" name="phone" {...register("phone")} defaultValue={projectManager.phone} className="form-control shadow w-25"></input>
                                            {errors.address?.type === "required" && (
                                                <p className="errorMsg text-danger">A phone number is required.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <Link to="/projectmanagersindex" className="btn btn-secondary">Back</Link>
                                    <input type="submit" value="Save" className="btn btn-primary shadow mx-1" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}