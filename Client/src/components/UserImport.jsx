const UserImport = () => {
    return (
        <>
            <div className="form">
                <p>Felhasználók importálása</p>
                <div className="">
                <label className='form-label'>Fájl feltöltése</label>
                <input id="file-upload" name="file-upload" type="file" class="form-input"></input>
                </div>

            </div>
        </>
    );
};

export default UserImport;