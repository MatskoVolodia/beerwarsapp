using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.DataAccess
{
    public class DataContextProvider
    {
        private BWContext _dataContext;

        public BWContext Get()
        {
            return _dataContext ?? (_dataContext = new BWContext());
        }

        private bool _isDisposed;

        ~DataContextProvider()
        {
            Dispose(false);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        private void Dispose(bool disposing)
        {
            if (!_isDisposed && disposing)
            {
                DisposeCore();
            }

            _isDisposed = true;
        }

        protected void DisposeCore()
        {
            _dataContext?.Dispose();
        }
    }
}
