namespace WebApp.Base
{
    public class BaseModel
    {
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        /*{ get { return CreatedOn; } set {CreatedOn=DateTime.Now.ToLocalTime() ; }}*/

        public BaseModel()
        {

        }
    }
}
